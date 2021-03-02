"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEverything = void 0;
const R = __importStar(require("ramda"));
const config_js_1 = __importDefault(require("./config.js"));
const alg_parser_js_1 = require("./alg_parser.js");
const getOutputFormat = (defaultFormat, formatOptions, requestedFormat) => {
    if (R.includes(requestedFormat, formatOptions)) {
        return requestedFormat;
    }
    return defaultFormat;
};
const parseRotation = R.cond([
    [R.startsWith('x'), (r) => [0, Number(R.tail(r))]],
    [R.startsWith('y'), (r) => [1, Number(R.tail(r))]],
    [R.startsWith('z'), (r) => [2, Number(R.tail(r))]],
]);
const getRotationSequence = (defaultRotation, view, rtn) => {
    if (view === 'plan') {
        return [[0, -90]];
    }
    const regexMatch = rtn
        ? R.match(/([xyz])(\-?[0-9][0-9]?[0-9]?)/g, rtn)
        : [];
    const rotationMatch = R.isEmpty(regexMatch)
        ? defaultRotation
        : regexMatch;
    return R.map(parseRotation, rotationMatch);
};
const isNumberBetweenOrDefault = (x, y, num, def) => R.both(R.lt(x), R.gt(y))(num) ? num : def;
const getColourScheme = (defaultColourScheme, scheme) => R.mergeRight(defaultColourScheme, scheme);
const getStageMask = (defaultStage, stage, dim) => {
    const [stageMask, stageRotation] = R.split('-', stage ?? defaultStage);
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
    }
    else {
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
    if (mask && stageRotation) {
        mask = R.join('', alg_parser_js_1.fcs_doperm(R.map(Number, R.split('', mask)), stageRotation, dim));
    }
    return mask;
};
const generateFacelets = (dim, mask, view) => {
    let f = [];
    for (let fc = 0; fc < 6; fc++) {
        for (let i = 0; i < dim * dim; i++) {
            f[fc * dim * dim + i] =
                mask[fc * dim * dim + i] === '0' ? (view == 'trans' ? 7 : 6) : fc;
        }
    }
    return f;
};
const parseEverything = (options) => {
    const outputFormat = getOutputFormat(config_js_1.default.outputFormat, config_js_1.default.outputFormatOptions, options?.fmt);
    const view = options?.view ?? config_js_1.default.view;
    const rotationSequence = getRotationSequence(config_js_1.default.rotation, view, options.rtn);
    const puzzleSize = isNumberBetweenOrDefault(0, 11, options?.pzl, config_js_1.default.defaultPuzzle);
    const colourScheme = getColourScheme(config_js_1.default.colourScheme, options?.scheme);
    const distanceFromCube = isNumberBetweenOrDefault(0, 101, options?.dist, config_js_1.default.distance);
    const backgroundColour = options?.bg ?? config_js_1.default.backgroundColour;
    const cubeOpacity = view === 'trans'
        ? 50
        : isNumberBetweenOrDefault(0, 101, options?.co, config_js_1.default.cubeOpacity);
    const faceOpacity = isNumberBetweenOrDefault(0, 101, options?.fo, config_js_1.default.faceletOpacity);
    const mask = getStageMask(config_js_1.default.stage, options.stage, puzzleSize);
    const facelets = generateFacelets(puzzleSize, mask, view);
    const alg = options.alg ?? '';
    const invertedAlg = options.case ? alg_parser_js_1.invert_alg(options.case) : '';
    const faceletsAfterAlg = alg_parser_js_1.fcs_doperm(facelets, `${invertedAlg} ${alg}`, puzzleSize);
    return {
        outputFormat,
        view,
        rotationSequence,
        puzzleSize,
        colourScheme,
        distanceFromCube,
        backgroundColour,
        cubeOpacity,
        faceOpacity,
        facelets: faceletsAfterAlg,
        alg,
        rv: config_js_1.default.rv,
        ox: config_js_1.default.ox,
        oy: config_js_1.default.oy,
        vw: config_js_1.default.vw,
        vh: config_js_1.default.vh,
        sw: config_js_1.default.sw,
        cubeColour: config_js_1.default.cubeColour,
        OUTLINE_WIDTH: config_js_1.default.OUTLINE_WIDTH,
    };
};
exports.parseEverything = parseEverything;
let using_cols = false;
