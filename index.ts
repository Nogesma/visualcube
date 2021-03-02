import { parseEverything } from './src/parse_input.js';
import { generateImage } from './src/svg-parser.js';

export default function (options) {
  return generateImage(parseEverything(options));
}
