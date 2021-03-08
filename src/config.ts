interface ColourScheme {
  [U: string]: string;
  R: string;
  F: string;
  L: string;
  D: string;
  B: string;
  T: string;
}

interface Options {
  fmt?: string;
  rtn?: string;
  view?: string;
  pzl?: number;
  size?: number;
  scheme?: ColourScheme;
  dist?: number;
  co?: number;
  fo?: number;
  stage?: string;
  alg?: string;
  case?: string;
  bg?: string;
  // ac?: string;
  // arw?: string;
}

interface SvgOptions {
  outputFormat: string;
  view: string;
  rotationSequence: number[][];
  puzzleSize: number;
  cs: ColourScheme;
  distanceFromCube: number;
  backgroundColour: string;
  cubeOpacity: number;
  faceOpacity: number;
  facelets: number[];
  rv: number[][];
  ox: number;
  oy: number;
  vw: number;
  vh: number;
  sw: number;
  cubeColour: string;
  OUTLINE_WIDTH: number;
  imageSize: number;
  // arrowsColour: string;
  // arrowsDefinitions: any;
}

const defaultConfig = {
  maxPuzzleSize: 10,
  defaultPuzzle: 3,
  outputFormat: 'webp',
  outputSize: 128,
  view: '',
  stage: '',
  rotation: ['y45', 'x-34'],
  alg: '',
  case: '',
  faceletDefinition: '',
  faceletColours: '',
  colourScheme: {
    U: '#FFFFFF',
    R: '#EE0000',
    F: '#00D800',
    L: '#FFA100',
    D: '#FEFE00',
    B: '#0000F2',
    N: '#404040',
    T: 't',
  },
  backgroundColour: 'white',
  cubeColour: 'black',
  cubeOpacity: 100,
  faceletOpacity: 100,
  distance: 5,
  outputFormatOptions: ['jpeg', 'jpg', 'png', 'tiff', 'webp', 'svg'],
  OUTLINE_WIDTH: 0.94,
  sw: 0,
  ox: -0.9,
  oy: -0.9,
  vw: 1.8,
  vh: 1.8,
  rv: [
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0],
    [-1, 0, 0],
    [0, 0, 1],
  ],
  defaultSize: 128,
  // arrowsColour: 'grey',
};

export { defaultConfig, SvgOptions, ColourScheme, Options };
