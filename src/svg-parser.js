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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = void 0;
const utilities_js_1 = require("./utilities.js");
const R = __importStar(require("ramda"));
const initCube = (rv, dim, dist, rtn) => {
    let p = [];
    let t = [-dim / 2, -dim / 2, -dim / 2];
    let zpos = [0, 0, dist];
    for (let fc = 0; fc < 6; fc++) {
        p.push([]);
        for (let i = 0; i <= dim; i++) {
            p[fc].push([]);
            for (let j = 0; j <= dim; j++) {
                p[fc][i].push([]);
                switch (fc) {
                    case 0:
                        p[fc][i][j] = [i, 0, dim - j];
                        break;
                    case 1:
                        p[fc][i][j] = [dim, j, i];
                        break;
                    case 2:
                        p[fc][i][j] = [i, j, 0];
                        break;
                    case 3:
                        p[fc][i][j] = [i, dim, j];
                        break;
                    case 4:
                        p[fc][i][j] = [0, j, dim - i];
                        break;
                    case 5:
                        p[fc][i][j] = [dim - i, j, dim];
                        break;
                }
                p[fc][i][j] = utilities_js_1.translate(p[fc][i][j], t);
                p[fc][i][j] = utilities_js_1.scale(p[fc][i][j], 1 / dim);
                for (let rn of rtn) {
                    p[fc][i][j] = utilities_js_1.rotate(p[fc][i][j], rn[0], (Math.PI * rn[1]) / 180);
                }
                p[fc][i][j] = utilities_js_1.translate(p[fc][i][j], zpos);
                p[fc][i][j] = utilities_js_1.project(p[fc][i][j], zpos[2]);
            }
        }
        for (let rn of rtn) {
            rv[fc] = utilities_js_1.rotate(rv[fc], rn[0], (Math.PI * rn[1]) / 180);
        }
    }
    return p;
};
const initRenderOrder = (rv) => {
    let ro = [0, 1, 2, 3, 4, 5];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (rv[ro[j]][2] < rv[ro[j + 1]][2]) {
                let u = ro[j];
                ro[j] = ro[j + 1];
                ro[j + 1] = u;
            }
        }
    }
    return ro;
};
const facelet_svg = (p, fc, dim, cc, colourScheme, facelets) => {
    let svg = '';
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            let cf = [
                (p[fc][j][i][0] + p[fc][j + 1][i + 1][0]) / 2,
                (p[fc][j][i][1] + p[fc][j + 1][i + 1][1]) / 2,
                0,
            ];
            let p1 = utilities_js_1.trans_scale(R.clone(p[fc][j][i]), cf, 0.85);
            let p2 = utilities_js_1.trans_scale(R.clone(p[fc][j + 1][i]), cf, 0.85);
            let p3 = utilities_js_1.trans_scale(R.clone(p[fc][j + 1][i + 1]), cf, 0.85);
            let p4 = utilities_js_1.trans_scale(R.clone(p[fc][j][i + 1]), cf, 0.85);
            svg += gen_facelet(p1, p2, p3, p4, fc * dim * dim + i * dim + j, cc, colourScheme, facelets);
        }
    }
    return svg;
};
function oll_svg(fc, rv, dim, p, cc, colourScheme, facelets) {
    let svg = '';
    let tv1 = utilities_js_1.scale(rv[fc], 0.0);
    let tv2 = utilities_js_1.scale(rv[fc], 0.2);
    let i = 0;
    for (let j = 0; j < dim; j++) {
        let cf = [
            (p[fc][j][i][0] + p[fc][j + 1][i + 1][0]) / 2,
            (p[fc][j][i][1] + p[fc][j + 1][i + 1][1]) / 2,
            0,
        ];
        let p1 = utilities_js_1.translate(utilities_js_1.trans_scale(p[fc][j][i], cf, 0.94), tv1);
        let p2 = utilities_js_1.translate(utilities_js_1.trans_scale(p[fc][j + 1][i], cf, 0.94), tv1);
        let p3 = utilities_js_1.translate(utilities_js_1.trans_scale(p[fc][j + 1][i + 1], cf, 0.94), tv2);
        let p4 = utilities_js_1.translate(utilities_js_1.trans_scale(p[fc][j][i + 1], cf, 0.94), tv2);
        svg += gen_facelet(p1, p2, p3, p4, fc * dim * dim + i * dim + j, cc, colourScheme, facelets);
    }
    return svg;
}
function gen_facelet(p1, p2, p3, p4, seq, cc, colourScheme, facelets) {
    let fcol = colourScheme[['U', 'R', 'F', 'L', 'D', 'B', 'N', 'T'][facelets[seq]]];
    return `<polygon ${fcol === 't' ? 'fill-opacity="0"' : `fill='${fcol}'`} stroke='${cc}' points='${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]} ${p4[0]},${p4[1]}'/>`;
}
const generateImage = ({ outputFormat, view, rotationSequence, puzzleSize, colourScheme, distanceFromCube, backgroundColour, cubeOpacity, faceOpacity, facelets, alg, rv, ox, oy, vw, vh, sw, cubeColour, OUTLINE_WIDTH, }) => {
    const p = initCube(rv, puzzleSize, distanceFromCube, rotationSequence);
    const ro = initRenderOrder(rv);
    let cube = `<svg xmlns='http://www.w3.org/2000/svg' width='${puzzleSize}' height='${puzzleSize}' viewBox='${ox} ${oy} ${vw} ${vh}'>`;
    if (backgroundColour) {
        cube += `<rect fill='${backgroundColour}' x='${ox}' y='${oy}' width='${vw}' height='${vh}'/>`;
    }
    if (cubeOpacity < 100) {
        cube += `<g style='opacity: ${faceOpacity / 100} ;stroke-opacity:0.5;stroke-width:${sw};stroke-linejoin:round'>`;
        for (let ri = 0; ri < 3; ri++) {
            cube += facelet_svg(p, ro[ri], puzzleSize, cubeColour, colourScheme, facelets);
        }
        cube += '</g>';
        cube += `<g style='stroke-width:0.1;stroke-linejoin:round;opacity:${cubeOpacity / 100}'>`;
        for (let ri = 0; ri < 3; ri++) {
            cube += utilities_js_1.outline_svg(p, ro[ri], cubeColour, puzzleSize, OUTLINE_WIDTH);
        }
        cube += '</g>';
    }
    cube += `<g style='stroke-width:0.1;stroke-linejoin:round;opacity:${cubeOpacity / 100}'>`;
    for (let ri = 3; ri < 6; ri++) {
        if (utilities_js_1.face_visible(ro[ri], rv) || cubeOpacity < 100) {
            cube += utilities_js_1.outline_svg(p, ro[ri], cubeColour, puzzleSize, OUTLINE_WIDTH);
        }
    }
    cube += '</g>';
    cube += `<g style='opacity:${faceOpacity / 100};stroke-opacity:0.5;stroke-width:${sw};stroke-linejoin:round'>`;
    for (let ri = 3; ri < 6; ri++) {
        if (utilities_js_1.face_visible(ro[ri], rv) || cubeOpacity < 100) {
            cube += facelet_svg(p, ro[ri], puzzleSize, cubeColour, colourScheme, facelets);
        }
    }
    cube += '</g>';
    if (view === 'plan') {
        cube += `<g style='opacity:${faceOpacity / 100};stroke-opacity:1;stroke-width:0.02;stroke-linejoin:round'>`;
        let toRender = [2, 4, 5, 1];
        for (let key in toRender) {
            cube += oll_svg(toRender[key], rv, puzzleSize, p, cubeColour, colourScheme, facelets);
        }
        cube += '</g>';
    }
    cube += '</svg>';
    let img = outputFormat === 'svg' ? cube : '';
    return cube;
};
exports.generateImage = generateImage;
