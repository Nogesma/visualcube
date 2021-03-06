import R from 'ramda';
import sharp, { FormatEnum } from 'sharp';

import { ColourScheme, SvgOptions } from './config';
import {
  project,
  face_visible,
  outline_svg,
  trans_scale,
  rotate,
  translate,
  scale,
} from './utilities.js';

const initCube = (
  rv: number[][],
  dim: number,
  dist: number,
  rtn: number[][]
) => {
  let p: number[][][][] = [];
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

        // Now scale and tranform point to ensure size/pos independent of dim
        p[fc][i][j] = translate(p[fc][i][j], t);
        p[fc][i][j] = scale(p[fc][i][j], 1 / dim);
        // Rotate cube as per perameter settings
        for (let rn of rtn) {
          p[fc][i][j] = rotate(p[fc][i][j], rn[0], (Math.PI * rn[1]) / 180);
        }
        // Move cube away from viewer
        p[fc][i][j] = translate(p[fc][i][j], zpos);
        // Finally project the 3D points onto 2D
        p[fc][i][j] = project(p[fc][i][j], zpos[2]);
      }
    }
    // Rotate rotation vectors
    for (let rn of rtn) {
      rv[fc] = rotate(rv[fc], rn[0], (Math.PI * rn[1]) / 180);
    }
  }
  return p;
};

const initRenderOrder = (rv: number[][]) => {
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

// ---------------------------[ Rendering Functions ]----------------------------
// Returns svg for a faces facelets

// TODO: Generates svg for an arrow pointing from sticker s1 to s2
// function gen_arrow(
//   s1: number[],
//   s2: number[],
//   sv: number[],
//   sc: number,
//   col: string,
//   dim: number,
//   p: number[][][][]
// ): string {
//   if (col === 't') {
//     return '';
//   }
//   // Find centre point of each facelet
//   let p1 = [
//     (p[s1[0]][s1[1]][s1[2]][0] + p[s1[0]][s1[1] + 1][s1[2] + 1][0]) / 2,
//     (p[s1[0]][s1[1]][s1[2]][1] + p[s1[0]][s1[1] + 1][s1[2] + 1][1]) / 2,
//     0,
//   ];
//   let p2 = [
//     (p[s2[0]][s2[1]][s2[2]][0] + p[s2[0]][s2[1] + 1][s2[2] + 1][0]) / 2,
//     (p[s2[0]][s2[1]][s2[2]][1] + p[s2[0]][s2[1] + 1][s2[2] + 1][1]) / 2,
//     0,
//   ];
//   // Find midpoint between p1 and p2
//   let cp = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, 0];
//   // Shorten arrows towards midpoint according to config
//   p1 = trans_scale(p1, cp, sc);
//   p2 = trans_scale(p2, cp, sc);
//   let p_ = sv
//     ? trans_scale(
//         [
//           (p[sv[0]][sv[1]][sv[2]][0] + p[sv[0]][sv[1] + 1][sv[2] + 1][0]) / 2,
//           (p[sv[0]][sv[1]][sv[2]][1] + p[sv[0]][sv[1] + 1][sv[2] + 1][1]) / 2,
//           0,
//         ],
//         cp,
//         sv[3]
//       )
//     : p1;
//
//   // Calculate arrow rotation
//   let rt = p_[1] > p2[1] ? 270 : 90;
//   if (p2[0] - p_[0] != 0) {
//     rt = Math.atan((p2[1] - p_[1]) / (p2[0] - p_[0])) * (Math.PI / 180);
//     rt = p_[0] > p2[0] ? rt + 180 : rt;
//   }
//   return `<path d="M $p1[0],$p1[1] (isset($pv)?'Q '.$pv[0].','.$pv[1]:'L').' '.$p2[0].','.$p2[1].'"
//     style="fill:none;stroke:${col};stroke-opacity:1" />
//     <path transform="translate(${p2[0]},${p2[1]}) scale(${
//     0.033 / dim
//   }) rotate(${rt})"
//     d="M 5.77,0.0 L -2.88,5.0 L -2.88,-5.0 L 5.77,0.0 z"
//     style="fill:${col};stroke-width:0;stroke-linejoin:round/>`;
// }

const facelet_svg = (
  p: number[][][][],
  fc: number,
  dim: number,
  cc: string,
  cs: ColourScheme,
  facelets: number[]
) => {
  let svg = '';
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      // Find centre point of facelet
      let cf = [
        (p[fc][j][i][0] + p[fc][j + 1][i + 1][0]) / 2,
        (p[fc][j][i][1] + p[fc][j + 1][i + 1][1]) / 2,
        0,
      ];
      // Scale points in towards centre
      let p1 = trans_scale(R.clone(p[fc][j][i]), cf, 0.85);
      // if (abcd === 0) {
      //   console.log(JSON.stringify(p));
      //   console.log();
      //   abcd++;
      // }
      let p2 = trans_scale(R.clone(p[fc][j + 1][i]), cf, 0.85);
      let p3 = trans_scale(R.clone(p[fc][j + 1][i + 1]), cf, 0.85);
      let p4 = trans_scale(R.clone(p[fc][j][i + 1]), cf, 0.85);
      // Generate facelet polygon
      svg += gen_facelet(
        p1,
        p2,
        p3,
        p4,
        fc * dim * dim + i * dim + j,
        cc,
        cs,
        facelets
      );
    }
  }
  return svg;
};

// Renders the top rim of the R U L and B faces out from side of cube
function oll_svg(
  fc: number,
  rv: number[][],
  dim: number,
  p: number[][][][],
  cc: string,
  cs: ColourScheme,
  facelets: number[]
) {
  let svg = '';
  // Translation vector, to move faces out
  let tv1 = scale(rv[fc], 0.0);
  let tv2 = scale(rv[fc], 0.2);
  let i = 0;
  for (let j = 0; j < dim; j++) {
    // Find centre point of facelet
    let cf = [
      (p[fc][j][i][0] + p[fc][j + 1][i + 1][0]) / 2,
      (p[fc][j][i][1] + p[fc][j + 1][i + 1][1]) / 2,
      0,
    ];
    // Scale points in towards centre and skew
    let p1 = translate(trans_scale(p[fc][j][i], cf, 0.94), tv1);
    let p2 = translate(trans_scale(p[fc][j + 1][i], cf, 0.94), tv1);
    let p3 = translate(trans_scale(p[fc][j + 1][i + 1], cf, 0.94), tv2);
    let p4 = translate(trans_scale(p[fc][j][i + 1], cf, 0.94), tv2);
    // Generate facelet polygon
    svg += gen_facelet(
      p1,
      p2,
      p3,
      p4,
      fc * dim * dim + i * dim + j,
      cc,
      cs,
      facelets
    );
  }
  return svg;
}

/** Generates a polygon SVG tag for cube facelets */
function gen_facelet(
  p1: number[],
  p2: number[],
  p3: number[],
  p4: number[],
  seq: number,
  cc: string,
  cs: ColourScheme,
  facelets: number[]
): string {
  let fcol = cs[['U', 'R', 'F', 'D', 'L', 'B', 'N', 'T'][facelets[seq]]];
  return `<polygon ${
    fcol === 't' ? 'fill-opacity="0"' : `fill='${fcol}'`
  } stroke='${cc}' points='${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${
    p3[1]
  } ${p4[0]},${p4[1]}'/>`;
}

const generateImage = async ({
  outputFormat,
  view,
  rotationSequence,
  puzzleSize,
  cs,
  distanceFromCube,
  backgroundColour,
  cubeOpacity,
  faceOpacity,
  facelets,
  rv,
  ox,
  oy,
  vw,
  vh,
  sw,
  cubeColour,
  OUTLINE_WIDTH,
  imageSize,
}: // arrowsColour,
// arrowsDefinitions,
SvgOptions): Promise<Buffer> => {
  const p = initCube(rv, puzzleSize, distanceFromCube, rotationSequence);
  const ro = initRenderOrder(rv);

  let cube = `<svg xmlns='http://www.w3.org/2000/svg' width='${imageSize}' height='${imageSize}' viewBox='${ox} ${oy} ${vw} ${vh}'>`;

  // Draw background
  if (backgroundColour) {
    cube += `<rect fill='${backgroundColour}' x='${ox}' y='${oy}' width='${vw}' height='${vh}'/>`;
  }

  // Transparancy background rendering
  if (cubeOpacity < 100) {
    // Create polygon for each background facelet (transparency only)
    cube += `<g style='opacity: ${
      faceOpacity / 100
    } ;stroke-opacity:0.5;stroke-width:${sw};stroke-linejoin:round'>`;
    for (let ri = 0; ri < 3; ri++) {
      cube += facelet_svg(p, ro[ri], puzzleSize, cubeColour, cs, facelets);
    }
    cube += '</g>';
    // Create outline for each background face (transparency only)
    cube += `<g style='stroke-width:0.1;stroke-linejoin:round;opacity:${
      cubeOpacity / 100
    }'>`;
    for (let ri = 0; ri < 3; ri++) {
      cube += outline_svg(p, ro[ri], cubeColour, puzzleSize, OUTLINE_WIDTH);
    }
    cube += '</g>';
  }

  // Create outline for each visible face
  cube += `<g style='stroke-width:0.1;stroke-linejoin:round;opacity:${
    cubeOpacity / 100
  }'>`;

  for (let ri = 3; ri < 6; ri++) {
    if (face_visible(ro[ri], rv) || cubeOpacity < 100) {
      cube += outline_svg(p, ro[ri], cubeColour, puzzleSize, OUTLINE_WIDTH);
    }
  }
  cube += '</g>';

  // Create polygon for each visible facelet
  cube += `<g style='opacity:${
    faceOpacity / 100
  };stroke-opacity:0.5;stroke-width:${sw};stroke-linejoin:round'>`;

  for (let ri = 3; ri < 6; ri++) {
    if (face_visible(ro[ri], rv) || cubeOpacity < 100) {
      cube += facelet_svg(p, ro[ri], puzzleSize, cubeColour, cs, facelets);
    }
  }
  cube += '</g>';

  // Create OLL view guides
  if (view === 'plan') {
    cube += `<g style='opacity:${
      faceOpacity / 100
    };stroke-opacity:1;stroke-width:0.02;stroke-linejoin:round'>`;
    let toRender = [2, 4, 5, 1];
    for (let key in toRender) {
      cube += oll_svg(
        toRender[key],
        rv,
        puzzleSize,
        p,
        cubeColour,
        cs,
        facelets
      );
    }
    cube += '</g>';
  }

  // if (R.not(R.isEmpty(arrowsDefinitions))) {
  //   const awidth = 0.12 / puzzleSize;
  //   cube += `<g style=opacity:1;stroke-opacity:1;stroke-width:${awidth}};stroke-linecap:round>`;
  //   for (let i in arrowsDefinitions) {
  //     let a = arrowsDefinitions[i];
  //     cube += gen_arrow(
  //       a.arw[0],
  //       a.arw[1],
  //       a.arw[2],
  //       a.arw4,
  //       a.arw3 ?? arrowsColour,
  //       puzzleSize,
  //       p
  //     );
  //   }
  //   cube += '</g>';
  // }

  cube += '</svg>';

  const svgBuffer = Buffer.from(cube);
  return outputFormat === 'svg'
    ? Promise.resolve(svgBuffer)
    : convert(svgBuffer, outputFormat);
};

const convert = (svgBuffer: Buffer, fmt: string): Promise<Buffer> =>
  sharp(svgBuffer)
    .toFormat(<keyof FormatEnum>fmt)
    .toBuffer();

export { generateImage };
