# IconPreparationPlugin

***
## Plugin transfers icons to dist

The "id" attribute will be added to the icon, according to the path to the file.  
The attributes "fill" and "stroke" will be removed from the icon in accordance with the flags set in the file name.

***
## Constructor
`new IconPreparationPlugin(inputPath, outputPath)`

***
## Filename format

The file name must end with ".icon.svg".  
To cancel the standard deletion of attributes (fill, stroke), you need to specify the flag.

### Input files flags
| Flag            | Filename example   | Description                   |
|-----------------|--------------------|-------------------------------|
|__[ -f, -ff ]__  | `logo.icon-f.svg`  | Cancel the removal of fill    |
|__[ -s, -ss ]__  | `logo.icon-s.svg`  | Cancel the removal of stroke  |

Flags with double letter will create 2 files

### Output files flags
| Flag            | Filename example   | Description                                           |
|-----------------|--------------------|-------------------------------------------------------|
|__-nf__  | `logo.icon-nf.svg`         | Indicates that the file is missing fill (no fill)     |
|__-ns__  | `logo.icon-ns.svg`         | Indicates that the file is missing stroke (no stroke) |

### Examples
| Input file               | Output files                                                                   |
|--------------------------|--------------------------------------------------------------------------------|
| `logo.icon.svg`          | `logo.icon-nf-ns.svg`                                                          |
| `logo.icon-f.svg`        | `logo.icon-ns.svg`                                                             |
| `logo.icon-f-s.svg`      | `logo.icon.svg`                                                                |
| `logo.icon-ff.svg`       | `logo.icon-nf-ns.svg`, `logo.icon-ns.svg`                                      |
| `logo.icon-ff-s.svg`     | `logo.icon-nf.svg`, `logo.icon.svg`                                            |
| `logo.icon-ff-ss.svg`    | `logo.icon-nf-ns.svg`, `logo.icon-nf.svg`, `logo.icon-ns.svg`, `logo.icon.svg` |

