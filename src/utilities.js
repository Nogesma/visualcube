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
exports.scale = exports.translate = exports.rotate = exports.trans_scale = exports.outline_svg = exports.face_visible = exports.project = void 0;
const R = __importStar(require("ramda"));
const project = (q, d) => [
    (q[0] * d) / q[2],
    (q[1] * d) / q[2],
    q[2],
];
exports.project = project;
const face_visible = (face, rv) => rv[face][2] < -0.105;
exports.face_visible = face_visible;
const outline_svg = (q, fc, cc, dim, OUTLINE_WIDTH) => `<polygon fill='${cc}' stroke='${cc}' points='${q[fc][0][0][0] * OUTLINE_WIDTH},${q[fc][0][0][1] * OUTLINE_WIDTH} ${q[fc][dim][0][0] * OUTLINE_WIDTH},${q[fc][dim][0][1] * OUTLINE_WIDTH} ${q[fc][dim][dim][0] * OUTLINE_WIDTH},${q[fc][dim][dim][1] * OUTLINE_WIDTH} ${q[fc][0][dim][0] * OUTLINE_WIDTH},${q[fc][0][dim][1] * OUTLINE_WIDTH}'/>`;
exports.outline_svg = outline_svg;
const translate = (q, t) => R.addIndex(R.map)((a, i) => R.add(a, t[i]))(q);
exports.translate = translate;
const scale = (q, f) => R.map(R.multiply(f))(q);
exports.scale = scale;
function rotate(q, ax, an) {
    let np = [q[0], q[1], q[2]];
    switch (ax) {
        case 0:
            np[2] = q[2] * Math.cos(an) - q[1] * Math.sin(an);
            np[1] = q[2] * Math.sin(an) + q[1] * Math.cos(an);
            break;
        case 1:
            np[0] = q[0] * Math.cos(an) + q[2] * Math.sin(an);
            np[2] = -q[0] * Math.sin(an) + q[2] * Math.cos(an);
            break;
        case 2:
            np[0] = q[0] * Math.cos(an) - q[1] * Math.sin(an);
            np[1] = q[0] * Math.sin(an) + q[1] * Math.cos(an);
            break;
    }
    return np;
}
exports.rotate = rotate;
const trans_scale = (q, v, f) => translate(scale(translate(q, [-v[0], -v[1], -v[2]]), f), v);
exports.trans_scale = trans_scale;
