import { Options } from './src/config';
import { parseEverything } from './src/parse_input.js';
import { generateImage } from './src/svg-parser.js';

export default function (options: Options): Promise<Buffer> {
  return generateImage(parseEverything(options));
}
