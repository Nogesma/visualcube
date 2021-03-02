import { parseEverything } from './src/parse_input.js';
import { generateImage } from './src/svg-parser.js';
const getNewImage = (options) => generateImage(parseEverything(options));
