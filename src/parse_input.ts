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
  };
};

// Retrieve colour def
// This overrides face def and makes the $scheme variable redundant (ie, gets reset to default)
// let uf = DEFAULTS['fc'];

//  uf = array_key_exists('fc', _REQUEST) ? _REQUEST['fc'] : (!array_key_exists('fd', _REQUEST) ? DEFAULTS['fc'] : '');
// if (preg_match('/^[ndlswyrobgmpt]+$/', uf)) {
// 	using_cols = true;
// 	scheme = DEF_SCHEME;
// 	var nf;
// 	nf = strlen(uf);
// 	__loop1:
// 		for (fc = 0; fc < 6; fc++) {
// 			__loop2: for (i = 0; i < dim * dim; i++) {
// 				// Add user defined face
// 				if (fc * dim * dim + i < nf) {
// 					facelets[fc * dim * dim + i] = uf[fc * dim * dim + i];
// 				} else {
// 					facelets[fc * dim * dim + i] = schcode[fc];
// 				}
// 			}
// 		}
// }

// TODO: Retrieve facelet def
// if (!uf) {
// 	uf = array_key_exists('fd', _REQUEST) ? _REQUEST['fd'] : DEFAULTS['fd'];
// 	if (preg_match('/^[udlrfbnot]+$/', uf)) {
// 		// Map from face names to numeric face ID
// 		var fd_map;
// 		fd_map = {
// 			'u': U,
// 			'r': R,
// 			'f': F,
// 			'd': D,
// 			'l': L,
// 			'b': B,
// 			'n': N,
// 			'o': O,
// 			't': T
// 		};
// 		nf = strlen(uf);
// 		__loop1:
// 			for (fc = 0; fc < 6; fc++) {
// 				__loop2: for (i = 0; i < dim * dim; i++) {
// 					// Add user defined face
// 					if (fc * dim * dim + i < nf) {
// 						facelets[fc * dim * dim + i] = fd_map[uf[fc * dim * dim + i]];
// 					} else {
// 						facelets[fc * dim * dim + i] = view == 'trans' ? T : N;
// 					}
// 				}
// 			}
// 	}
// }

// // Retrieve arrow defn's
// if (array_key_exists('arw', _REQUEST)) {
//     var astr;
//     astr = preg_split('/,/', _REQUEST['arw']);
//     i = 0;
//     var _key_;
//     __loop1:
//         for (_key_ in astr) {
//             var a;
//             a = astr[_key_];
//             var a_;
//             a_ = parse_arrow(a, dim);
//             if (a_) {
//                 var arrows;
//                 arrows[i++] = a_;
//             }
//         }
// }
// // Retrieve default arrow colour
// var ac;
// ac = GREY;
// if (array_key_exists('ac', _REQUEST)) {
//     var ac_;
//     ac_ = parse_col(_REQUEST['ac']);
//     if (ac_ && ac_ != 't') {
//         ac = ac_;
//     }
// }
// // Retrieve alg def
// if (array_key_exists('alg', _REQUEST) || array_key_exists('case', _REQUEST) || array_key_exists('alg', DEFAULTS) || array_key_exists('case', DEFAULTS)) {
// 	if (array_key_exists('alg', _REQUEST)) {
// 		var alg;
// 		alg = _REQUEST['alg'];
// 	} else {
// 		alg = DEFAULTS['alg'];
// 	}
// 	if (array_key_exists('case', _REQUEST)) {
// 		var
// 			case;
// 	case
// 		= _REQUEST['case'];
// 	} else {
// 	case
// 		= DEFAULTS['case'];
// 	}
// 	alg = fcs_format_alg(urldecode(alg));
// case
// 	= invert_alg(fcs_format_alg(urldecode(
// case)))
// 	;
// 	//			$facelets = facelet_cube(case_cube($alg), $dim, $facelets); // old 3x3 alg system
// 	facelets = fcs_doperm(facelets
// case
// 	+' ' + alg, dim
// )
// 	;
// 	// new NxN facelet permute
// }

export { parseEverything };
