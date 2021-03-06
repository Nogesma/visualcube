import R from 'ramda';

import { ColourScheme, Options } from './config';
import { defaultConfig } from './config.js';
import { fcs_doperm, invert_alg } from './alg_parser.js';

const getOutputFormat = (
  defaultFormat: string,
  formatOptions: string[],
  requestedFormat: string | undefined
): string => {
  if (R.includes(requestedFormat, formatOptions)) {
    return <string>requestedFormat;
  }
  return defaultFormat;
};

const parseRotation = R.cond([
  [R.startsWith('x'), (r) => [0, Number(R.tail(r))]],
  [R.startsWith('y'), (r) => [1, Number(R.tail(r))]],
  [R.startsWith('z'), (r) => [2, Number(R.tail(r))]],
]);

const getRotationSequence = (
  defaultRotation: string[],
  view: string,
  rtn: string | undefined
): number[][] => {
  if (view === 'plan') {
    return [[0, -90]];
  }
  const regexMatch: string[] = rtn
    ? R.match(/([xyz])(-?[0-9][0-9]?[0-9]?)/g, rtn)
    : [];
  const rotationMatch: string[] = R.isEmpty(regexMatch)
    ? defaultRotation
    : regexMatch;

  return R.map(parseRotation, rotationMatch);
};

// Check if a number is between X and Y (excluded), if not defaults to another number
const isNumberBetweenOrDefault = (
  x: number,
  y: number,
  num: number | undefined,
  def: number
): number => <number>(R.both(R.lt(x), R.gt(y))(num) ? num : def);

const getColourScheme = (
  defaultColourScheme: ColourScheme,
  scheme: ColourScheme | undefined
): ColourScheme => R.mergeRight(defaultColourScheme, <object>scheme);

// Retrieve stage variable
const getStageMask = (
  defaultStage: string,
  stage: string | undefined,
  dim: number
): string => {
  // Extract rotation sequence if present
  const [stageMask, stageRotation] = R.split('-', stage ?? defaultStage);

  // Stage Definitions
  let mask = '';
  if (dim === 3) {
    switch (stageMask) {
      case 'fl':
        mask = '000000000000000111000000111111111111000000111000000111';
        break;
      case 'f2l':
        mask = '000000000000111111000111111111111111000111111000111111';
        break;
      case 'll':
        mask = '111111111111000000111000000000000000111000000111000000';
        break;
      case 'cll':
        mask = '101010101101000000101000000000000000101000000101000000';
        break;
      case 'ell':
        mask = '010111010010000000010000000000000000010000000010000000';
        break;
      case 'oll':
        mask = '111111111000000000000000000000000000000000000000000000';
        break;
      case 'ocll':
        mask = '101010101000000000000000000000000000000000000000000000';
        break;
      case 'oell':
        mask = '010111010000000000000000000000000000000000000000000000';
        break;
      case 'coll':
        mask = '111111111101000000101000000000000000101000000101000000';
        break;
      case 'ocell':
        mask = '111111111010000000010000000000000000010000000010000000';
        break;
      case 'wv':
        mask = '111111111000111111000111111111111111000111111000111111';
        break;
      case 'vh':
        mask = '010111010000111111000111111111111111000111111000111111';
        break;
      case 'els':
        mask = '010111010000111011000111110110111111000111111000111111';
        break;
      case 'cls':
        mask = '111111111000111111000111111111111111000111111000111111';
        break;
      case 'cmll':
        mask = '101000101101111111101101101101101101101111111101101101';
        break;
      case 'cross':
        mask = '000000000000010010000010010010111010000010010000010010';
        break;
      case 'f2l_3':
        mask = '000000000000110110000011011011111010000010010000010010';
        break;
      case 'f2l_2':
        mask = '000000000000011011000010010010111111000110110000111111';
        break;
      case 'f2l_sm':
        mask = '000000000000110110000011011011111110000110110000011011';
        break;
      case 'f2l_1':
        mask = '000000000000011011000110110110111111000111111000111111';
        break;
      case 'f2b':
        mask = '000000000000111111000101101101101101000111111000101101';
        break;
      case 'line':
        mask = '000000000000000000000010010010010010000000000000010010';
        break;
      case '2x2x2':
        mask = '000000000000110110000011011011011000000000000000000000';
        break;
      case '2x2x3':
        mask = '000000000000110110000111111111111000000011011000000000';
        break;
    }
  } else {
    if (dim === 2) {
      switch (stage) {
        case 'fl':
          mask = '000000110011111100110011';
          break;
        case 'll':
          mask = '111111001100000011001100';
          break;
        case 'oll':
          mask = '111100000000111100000000';
          break;
      }
    }
  }
  // Apply alg to mask if defined
  if (mask && stageRotation) {
    mask = R.join(
      '',
      fcs_doperm(R.map(Number, R.split('', mask)), stageRotation, dim)
    );
  }

  return mask;
};

const generateFacelets = (
  dim: number,
  mask: string,
  view: string
): number[] => {
  let f = [];
  for (let fc = 0; fc < 6; fc++) {
    for (let i = 0; i < dim * dim; i++) {
      f[fc * dim * dim + i] =
        mask[fc * dim * dim + i] === '0' ? (view == 'trans' ? 7 : 6) : fc;
    }
  }
  return f;
};

// // Retrieve arrow defn's
// const getArrowDefinition = (arw: string, dim: number) => {
//   const astr = R.split(',', arw);
//   const arrows = [];
//   let i = 0;
//   for (let value of astr) {
//     const a = parse_arrow(value, dim);
//     console.log({ a });
//
//     if (a) arrows[i++] = a;
//   }
//   return arrows;
// };

// TODO: Parse arrow definition
// function parse_arrow(str: string, dim: number) {
//   let parts = R.split('-', str);
//   let fcodes: { [key: string]: number } = {
//     U: 0,
//     R: 1,
//     F: 2,
//     D: 3,
//     L: 4,
//     B: 5,
//   };
//
//   console.log({ parts });
//   if (R.length(parts) == 0) return null;
//
//   const split = R.match(/([URFDLB])([0-9]+)/g, parts[0]);
//   console.log({ split });
//   if (R.length(split) == 0) return null;
//
//   let arrow: number[][] = [[], [], []];
//   let arw3;
//   let arw4 = 1;
//
//   for (let i = 0; i < 2; i++) {
//     if (i == 2 && split[1].length < 3) {
//       arrow[2][3] = 2;
//     }
//     arrow[i][0] = fcodes[split[1][i]];
//     const fn =
//       Number(split[1][i]) >= dim * dim ? dim * dim - 1 : Number(split[1][i]);
//     arrow[i][1] = fn % dim;
//     arrow[i][2] = Math.floor(fn / dim);
//   }
//   // Parse remainder
//   for (let i = 1; i < R.length(parts); i++) {
//     if (R.test(/^i[0-9]+$/g, parts[i]) && arrow[2]) {
//       arrow[2][3] = Number(parts[i].substr(1)) / 5;
//       arrow[2][3] = arrow[2][3] > 10 ? 10 : arrow[2][3];
//       // Var range = 0 to 50, default 10
//     } else {
//       if (R.test(/^s[0-9]+$/g, parts[i])) {
//         arw4 = Number(parts[i].substr(1)) / 10;
//         arw4 = arw4 > 2 ? 2 : arw4;
//         // Var range = 0 to 20, default 10
//       } else {
//         arw3 = Number(parts[i]);
//       }
//     }
//   }
//
//   return { arrow, arw3, arw4 };
// }

const parseEverything = (options: Options) => {
  const outputFormat: string = getOutputFormat(
    defaultConfig.outputFormat,
    defaultConfig.outputFormatOptions,
    options.fmt
  );
  const view = options?.view ?? defaultConfig.view;
  const rotationSequence: number[][] = getRotationSequence(
    defaultConfig.rotation,
    view,
    options.rtn
  );

  const puzzleSize: number = isNumberBetweenOrDefault(
    0,
    11,
    options.pzl,
    defaultConfig.defaultPuzzle
  );

  const imageSize: number = isNumberBetweenOrDefault(
    0,
    2049,
    options.size,
    defaultConfig.defaultSize
  );

  const colourScheme: ColourScheme = getColourScheme(
    defaultConfig.colourScheme,
    options.scheme
  );

  const distanceFromCube = isNumberBetweenOrDefault(
    0,
    101,
    options?.dist,
    defaultConfig.distance
  );
  const backgroundColour = options.bg ?? defaultConfig.backgroundColour;
  const cubeOpacity =
    view === 'trans'
      ? 50
      : isNumberBetweenOrDefault(
          0,
          101,
          options?.co,
          defaultConfig.cubeOpacity
        );
  const faceOpacity = isNumberBetweenOrDefault(
    0,
    101,
    options?.fo,
    defaultConfig.faceletOpacity
  );

  // const arrowsDefinitions = getArrowDefinition(options.arw ?? '', puzzleSize);
  // const arrowsColour = options.ac ?? defaultConfig.arrowsColour;

  const mask = getStageMask(defaultConfig.stage, options.stage, puzzleSize);
  const facelets = generateFacelets(puzzleSize, mask, view);

  const alg = options.alg ?? '';
  const invertedAlg = options.case ? invert_alg(options.case) : '';

  const faceletsAfterAlg = fcs_doperm(
    facelets,
    `${invertedAlg} ${alg}`,
    puzzleSize
  );

  return {
    outputFormat,
    view,
    rotationSequence,
    puzzleSize,
    cs: colourScheme,
    distanceFromCube,
    backgroundColour,
    cubeOpacity,
    faceOpacity,
    facelets: faceletsAfterAlg,
    alg,
    rv: defaultConfig.rv,
    ox: defaultConfig.ox,
    oy: defaultConfig.oy,
    vw: defaultConfig.vw,
    vh: defaultConfig.vh,
    sw: defaultConfig.sw,
    cubeColour: defaultConfig.cubeColour,
    OUTLINE_WIDTH: defaultConfig.OUTLINE_WIDTH,
    imageSize,
    // arrowsColour,
    // arrowsDefinitions,
  };
};

export { parseEverything };
