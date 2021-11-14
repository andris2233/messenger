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
 * @typedef {{ inputPath: string, outputPath: string, flags: string[] }} IconPathUnion
 * @typedef {{ pathUnion: IconPathUnion, icon: { elements: Element[] } }} IconDataUnion
 * @typedef { string } ErrorMessage
 */

// todo WRITE DOCUMENTATION

/** IconPreparationPlugin */
module.exports = class IconPreparationPlugin {
  /**
   * @param { string } inputPath - Path relative to the project directory to the directory for reading icons
   * @param { string } outputPath - Path relative to the "dist/public" to the directory for writing icons
   */
  constructor(
    inputPath = 'src/icons',
    outputPath = 'icons',
  ) {
    this.inputPath = path.normalize(inputPath);
    this.outputPath = path.normalize(outputPath);
    this.iconPostfix = 'icon';
  }

  /**
   * @param { string } inputPath
   * @return { IconPathUnion[] }
   */
  getIconPathUnions(inputPath) {
    const dirs = readDirSync(inputPath)
      .map((dir) => dir
        .replace(this.inputPath, '')
        .replace('\\', '')
        .replace(/\\/g, '/'))
      .filter((dir) => dir.match(new RegExp(`.+(\\.${this.iconPostfix}.*\\.svg)`)));

    return dirs
      .map((dir) => {
        const flags = this.getPathFlags(dir);

        const postfixMatch = dir
          .match(new RegExp(`.+(\\.${this.iconPostfix}.+\\.svg)`));

        return {
          inputPath: dir,
          outputPath: postfixMatch && postfixMatch[1]
            ? dir.replace(postfixMatch[1], `.${this.iconPostfix}.svg`)
            : dir,
          flags,
        };
      });
  }

  /**
   * @param { string } dir
   * @return { string[] }
   */
  getPathFlags(dir) {
    const recognizeRegExp = new RegExp(`\\.${this.iconPostfix}(.+)\\.svg`);
    const match = dir.match(recognizeRegExp);

    if (!match) return [];

    const flags = match[1].match(/-[\w]+/g);
    if (flags) return flags;

    return [];
  }

  /**
   * @param { IconPathUnion[] } iconPathUnions
   * @return { ErrorMessage[] }
   */
  static validateIconPathUnions(iconPathUnions) {
    const errorMessages = [];

    iconPathUnions.forEach((pathUnion) => {
      const incongruousFlags = [
        ['-ff', '-f'],
        ['-ss', '-s'],
      ];
      const iFlagsMatchCounts = [...Array(incongruousFlags.length)].map(() => 0);

      incongruousFlags.forEach((iFlags, iFlagI) => {
        iFlags.forEach((iFlag) => {
          iFlagsMatchCounts[iFlagI] += Number(pathUnion.flags.includes(iFlag));
        });
      });

      const matchedIncongruousFlags = [];
      iFlagsMatchCounts.forEach((matchCount, matchCountI) => {
        if (matchCount > 1) matchedIncongruousFlags.push(incongruousFlags[matchCountI]);
      });

      if (matchedIncongruousFlags.length) {
        const arr = matchedIncongruousFlags.reduce((acc, el) => [...acc, `[${el.join(', ')}]`], []);
        errorMessages.push(
          `Icon "${pathUnion.inputPath}" has incongruous flags, such as: ${arr.join(', ')}`,
        );
      }
    });

    return errorMessages;
  }

  /**
   * @param { IconDataUnion } iconDataUnion
   * @param { string[] } attrKeys
   * @return { IconDataUnion }
   */
  static removeAttributes(iconDataUnion, attrKeys) {
    if (!attrKeys.length) return iconDataUnion;

    const removeElementAttributes = (el) => {
      attrKeys.forEach((key) => {
        if (el.attributes[key]) delete el.attributes[key];
      });
      if (el.elements) {
        for (let i = 0; i < el.elements.length; i++) removeElementAttributes(el.elements[i]);
      }
    };

    const element = iconDataUnion.icon.elements[0];
    removeElementAttributes(element);

    return iconDataUnion;
  }

  /**
   * @param { IconPathUnion[] } iconPathUnions
   * @return { IconDataUnion[] }
   */
  getIconDataUnions(iconPathUnions) {
    /** @type { IconDataUnion[] } */
    const iconDataUnions = iconPathUnions
      .map((iconPathUnion) => ({
        pathUnion: iconPathUnion,
        icon: xml2js(fs.readFileSync(
          path.join(this.inputPath, iconPathUnion.inputPath), { encoding: 'utf-8' },
        )),
      }));

    const { removeAttributes } = IconPreparationPlugin;

    /** @type IconDataUnion[] */
    const resultIconDataUnions = [];

    iconDataUnions.forEach((idu) => {
      const { flags } = idu.pathUnion;

      const baseId = `${
        idu.pathUnion.outputPath
          .match(new RegExp(`(.+)\\.${this.iconPostfix}.*\\.svg`))[1]
      }.icon`;

      const addNoAll = () => {
        const iduNoAll = cloneDeep(idu);
        const id = `${baseId}-nf-ns`;
        iduNoAll.icon.elements[0].attributes.id = id;
        iduNoAll.pathUnion.outputPath = `${id}.svg`;
        removeAttributes(iduNoAll, ['fill', 'stroke']);
        resultIconDataUnions.push(iduNoAll);
      };
      const addNoFill = () => {
        const iduNoFill = cloneDeep(idu);
        const id = `${baseId}-nf`;
        iduNoFill.icon.elements[0].attributes.id = id;
        iduNoFill.pathUnion.outputPath = `${id}.svg`;
        removeAttributes(iduNoFill, ['fill']);
        resultIconDataUnions.push(iduNoFill);
      };
      const addNoStroke = () => {
        const iduNoStroke = cloneDeep(idu);
        const id = `${baseId}-ns`;
        iduNoStroke.icon.elements[0].attributes.id = id;
        iduNoStroke.pathUnion.outputPath = `${id}.svg`;
        removeAttributes(iduNoStroke, ['stroke']);
        resultIconDataUnions.push(iduNoStroke);
      };
      const addWithAll = () => {
        const iduWithAll = cloneDeep(idu);
        const id = `${baseId}`;
        iduWithAll.icon.elements[0].attributes.id = id;
        iduWithAll.pathUnion.outputPath = `${id}.svg`;
        resultIconDataUnions.push(iduWithAll);
      };

      /** @type { { flags: string[], handler: function }[] } */
      const combinationsMatrix = [
        { flags: [], handler: addNoAll },
        { flags: ['-f'], handler: addNoStroke },
        { flags: ['-s'], handler: addNoFill },
        { flags: ['-f', '-s'], handler: addWithAll },
        { flags: ['-ff'], handler: () => { addNoAll(); addNoStroke(); } },
        { flags: ['-ss'], handler: () => { addNoAll(); addNoFill(); } },
        { flags: ['-ff', '-s'], handler: () => { addWithAll(); addNoFill(); } },
        { flags: ['-f', '-ss'], handler: () => { addWithAll(); addNoStroke(); } },
        {
          flags: ['-ff', '-ss'],
          handler: () => {
            addNoAll();
            addNoFill();
            addNoStroke();
            addWithAll();
          },
        },
      ];

      const foundCombination = combinationsMatrix
        .find((comb) => comb.flags.length === flags.length
        && comb.flags.reduce((acc, flag) => acc && flags.includes(flag), true));

      if (foundCombination) foundCombination.handler();
    });

    return resultIconDataUnions;
  }

  /**
   * @param { object } compilation
   * @param { IconDataUnion[] } iconDataUnions
   */
  concatIconsToAssets(compilation, iconDataUnions) {
    console.log('\n\nIconPreparationPlugin:\n');

    iconDataUnions.forEach((iconDataUnion) => {
      const iconSvg = js2xml(iconDataUnion.icon);
      const fullPath = path.join(this.outputPath, iconDataUnion.pathUnion.outputPath);

      compilation.assets[fullPath] = {
        source() { return iconSvg; },
        size() { return iconSvg.length; },
      };
      console.log(`## DONE - PATH: "${iconDataUnion.pathUnion.outputPath}"`);
    });
  }

  main(compilation) {
    const iconPathUnions = this.getIconPathUnions(this.inputPath);

    const errors = IconPreparationPlugin
      .validateIconPathUnions(iconPathUnions);

    if (errors.length) {
      compilation.errors.push(new Error(errors.join('\n')));
    }
    else {
      const iconDataUnions = this.getIconDataUnions(iconPathUnions);

      this.concatIconsToAssets(compilation, iconDataUnions);
    }
  }

  apply(compiler) {
    compiler.hooks.emit.tap(
      'IconPreparationPlugin',
      async (compilation) => { await this.main(compilation); },
    );
  }
};
