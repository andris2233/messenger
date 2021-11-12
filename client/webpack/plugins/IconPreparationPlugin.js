/* eslint-disable
  import/no-extraneous-dependencies,
  @typescript-eslint/no-var-requires
*/
const { xml2js, js2xml } = require('xml-js');
const { cloneDeep } = require('lodash');

const path = require('path');
const fs = require('fs');

const readDirSync = require('recursive-readdir-sync');
/* eslint-enable */

/**
 * @typedef {{ path: string, iconObject: object }} IconDataUnion
 */

module.exports = class IconPreparationPlugin {
  constructor(inputPath = './src/assets/icons', outputPath = '/icons', substring = 'icon') {
    this.inputPath = path.normalize(inputPath);
    this.outputPath = path.normalize(outputPath);
    this.substring = substring;

    this.errors = [];
  }

  getDirs(inputPath) {
    const dirs = readDirSync(inputPath);

    return dirs
      .map((dir) => dir
        .replace(this.inputPath, '')
        .replace('\\', '')
        .replace(/\\/g, '/'))
      .filter((dir) => dir.match(this.substring));
  }

  /**
   * @param { string } dir
   */
  recognizeFlags(dir) {
    const recognizeRegExp = new RegExp(`\\.${this.substring}(.+)\\.svg`);
    const match = dir.match(recognizeRegExp);

    if (!match) return [];

    const flags = match[1].match(/-[\w]+/g);
    if (flags) return flags;

    return [];
  }

  /**
   * @param { string[] } dirs
   * @return { IconDataUnion[] }
   */
  getIconDataUnions(dirs) {
    /** @type { IconDataUnion[] } */
    const iconDataUnions = dirs
      .map((dir) => ({
        path: dir,
        iconObject: fs.readFileSync(
          path.join(this.inputPath, dir), { encoding: 'utf-8' },
        ),
      }));

    iconDataUnions.forEach((iconDataUnion) => {
      const flags = this.recognizeFlags(iconDataUnion.path);

      const incongruousFlags = [
        ['-ff', '-f'],
        ['-ss', '-s'],
      ];
      const iFlagsMatchCounts = [...Array(incongruousFlags.length)].map(() => 0);

      incongruousFlags.forEach((iFlags, iFlagI) => {
        iFlags.forEach((iFlag) => {
          iFlagsMatchCounts[iFlagI] += Number(flags.includes(iFlag));
        });
      });

      const matchedIncongruousFlags = [];
      iFlagsMatchCounts.forEach((matchCount, matchCountI) => {
        if (matchCount > 1) matchedIncongruousFlags.push(incongruousFlags[matchCountI]);
      });

      if (matchedIncongruousFlags.length) {
        const arr = matchedIncongruousFlags.reduce((acc, el) => [...acc, `[${el.join(', ')}]`], []);
        this.errors.push(
          `Icon "${iconDataUnion.path}" has incongruous flags, incongruous groups: ${arr.join(', ')}`,
        );
      }
    });

    // for (let i = 0; i < iconDataUnions.length; i++) {
    //   const iconObject = iconObjects[i];
    //
    //   const id = dirs[i].split('.')[0] || 'default';
    //   iconObject.elements[0].attributes.id = id;
    //
    //   const fileName = `${id}.${this.substring}.svg`;
    // }
    debugger;
  }

  /**
   * @param { object } compilation
   * @param { IconDataUnion[] } iconDataUnions
   */
  concatIconsToAssets(compilation, iconDataUnions) {
    iconDataUnions.forEach((iconDataUnion) => {
      const iconSvg = js2xml(iconDataUnion.iconObject);
      const fullPath = path.join(this.outputPath, iconDataUnion.path);

      compilation.assets[fullPath] = {
        source() { return iconSvg; },
        size() { return iconSvg.length; },
      };
      console.log(`## DONE - PATH: "${iconDataUnion.path}"`);
    });
  }

  main(compilation) {
    const dirs = this.getDirs(this.inputPath);

    const iconDataUnions = this.getIconDataUnions(dirs);

    if (this.errors.length) {
      compilation.errors.push(new Error(this.errors.join('\n')));
    }

    this.concatIconsToAssets(compilation, iconDataUnions);
  }

  apply(compiler) {
    compiler.hooks.emit.tap(
      'IconPreparationPlugin',
      async (compilation) => { await this.main(compilation); },
    );
  }
};
