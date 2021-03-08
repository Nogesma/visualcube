# visualcube

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Contents
* [Installation](#installation)
* [Usage](#usage)
    * [Basic usage](#basic-usage)
    * [Advanced usage](#advanced-usage)
        * [setType](#settype)
        * [setCubieSize](#setcubiesize)
        * [setSpacing](#setspacing)
        * [setColorScheme](#setcolorscheme)
* [Contribute](#contribute)
* [Status](#status)

## Installation

```shell
yarn add visualcube
```
or, if you prefer npm
```shell
npm install visualcube
```

## Usage
### Basic Usage
```js
import { visualcube } from 'visualcube';
// // or if you're using cjs
const { visualcube } = require('visualcube');

// Usage
visualcube({options});
// returns a buffer of an image (svg, webp, png,...) depending on the options
```

### Available options and their defaults:

```js
const defaultConfig = {
  pzl: 3, // Size of the cube (1-10)
  fmt: 'webp', // Output format of image ('jpeg', 'jpg', 'png', 'tiff', 'webp', 'svg')
  size: 128, // Size of the image (converting large images from svg to other formats may be slow, no limits on size)
  view: '', // plan or trans
  stage: '', // ( fl | f2l | ll | cll | ell | oll | ocll | oell | coll | ocell | wv | vh | els | cls | cmll | cross | f2l_3 | f2l_2 | f2l_sm | f2l_1 | f2b | line | 2x2x2 | 2x2x3 )-?[xyz2']*
  rotation: ['y45', 'x-34'], // ([xyz]-?[0-9][0-9]?[0-9]?)+
  alg: '', // Alg to apply (each move must be separated by a space to avoid ambiguous cases ex: R2L can be R2 L or R 2L)
  case: '', // Alg to solve the case
  faceletDefinition: '',
  faceletColours: '',
  sch: {
    U: '#FFFFFF',
    R: '#EE0000',
    F: '#00D800',
    L: '#FFA100',
    D: '#FEFE00',
    B: '#0000F2',
    N: '#404040',
  }, // Colour scheme of the cube
  bg: 'white', // Background colour of the cube
  cc: 'black', // Cube colour
  co: 100, // Cube opacity
  fo: 100, // Facelet opacity
  dist: 5, //  Distance of the cube from the perspective of the viewer.
};
```

For more information on usage check out [http://cube.rider.biz/visualcube.php](http://cube.rider.biz/visualcube.php), it should function about the same way (some features are still missing on this version)