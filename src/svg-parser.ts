// Import configuration values

import {
  project,
  face_visible,
  outline_svg,
  trans_scale,
  rotate,
  translate,
  scale,
} from './utilities.js';

import * as R from 'ramda';

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

// -----------------[ User input functions ]----------------------

// TODO: Parse arrow definition
// function parse_arrow(str, dim) {
// 	var parts;
// 	parts = preg_split('/-/', str);
// 	var fcodes;
// 	fcodes = {
// 		'U': 0,
// 		'R': 1,
// 		'F': 2,
// 		'D': 3,
// 		'L': 4,
// 		'B': 5
// 	};
// 	if (count(parts) == 0) {
// 		return null;
// 	}
// 	if (!preg_match_all('/([URFDLB])([0-9]+)/', parts[0], split) || count(split) < 2) {
// 		return null;
// 	}
// 	var arrow;
// 	arrow = {};
// 	arrow[4] = 1;
// 	var i;
// 	__loop1:
// 		for (i = 0; i < 3; i++) {
// 			if (i == 2 && count(split[1]) < 3) {
// 				arrow[2] = null;
// 				break;
// 			} else {
// 				arrow[2][3] = 2;
// 			}
// 			arrow[i][0] = fcodes[split[1][i]];
// 			var fn;
// 			fn = split[2][i];
// 			fn = fn >= dim * dim ? dim * dim - 1 : fn;
// 			arrow[i][1] = fn % dim;
// 			arrow[i][2] = floor(fn / dim);
// 		}
// 	// Parse remainder
// 	__loop1:
// 		for (i = 1; i < count(parts); i++) {
// 			if (preg_match('/^i[0-9]+$/', parts[i]) && arrow[2]) {
// 				arrow[2][3] = substr(parts[i], 1) / 5;
// 				arrow[2][3] = arrow[2][3] > 10 ? 10 : arrow[2][3];
// 				// Var range = 0 to 50, default 10
// 			} else {
// 				if (preg_match('/^s[0-9]+$/', parts[i])) {
// 					arrow[4] = substr(parts[i], 1) / 10;
// 					arrow[4] = arrow[4] > 2 ? 2 : arrow[4];
// 					// Var range = 0 to 20, default 10
// 				} else {
// 					var ac_;
// 					ac_ = parse_col(parts[i]);
// 					if (ac_) {
// 						arrow[3] = ac_;
// 					}
// 				}
// 			}
// 		}
// 	return arrow;
// }

// TODO: Insert space in default fd/fc variables
// function insert_space(_in ,dim)
// {
// 	var out;
// 	out = '';
// 	dim *= dim;
// 		for (let i = 0; i < 6; i++) {
// 			out += substr( _in , dim * i, dim
// 		)
// 			+' ';
// 		}
// 	return out;
// }

// ---------------------------[ Rendering Functions ]----------------------------
// Returns svg for a faces facelets

// TODO: Generates svg for an arrow pointing from sticker s1 to s2
// function gen_arrow(id, s1, s2, sv, sc, col) {
//   if (col === 't') {
//     return;
//   }
//   // Find centre point of each facelet
//   let p1 = {
//     0: (p[s1[0]][s1[1]][s1[2]][0] + p[s1[0]][s1[1] + 1][s1[2] + 1][0]) / 2,
//     1: (p[s1[0]][s1[1]][s1[2]][1] + p[s1[0]][s1[1] + 1][s1[2] + 1][1]) / 2,
//     2: 0,
//   };
//   let p2 = {
//     0: (p[s2[0]][s2[1]][s2[2]][0] + p[s2[0]][s2[1] + 1][s2[2] + 1][0]) / 2,
//     1: (p[s2[0]][s2[1]][s2[2]][1] + p[s2[0]][s2[1] + 1][s2[2] + 1][1]) / 2,
//     2: 0,
//   };
//   // Find midpoint between p1 and p2
//   let cp = {
//     0: (p1[0] + p2[0]) / 2,
//     1: (p1[1] + p2[1]) / 2,
//     2: 0,
//   };
//   // Shorten arrows towards midpoint according to config
//   p1 = trans_scale(p1, cp, sc);
//   p2 = trans_scale(p2, cp, sc);
//   if (sv) {
//     var pv;
//     pv = {
//       0: (p[sv[0]][sv[1]][sv[2]][0] + p[sv[0]][sv[1] + 1][sv[2] + 1][0]) / 2,
//       1: (p[sv[0]][sv[1]][sv[2]][1] + p[sv[0]][sv[1] + 1][sv[2] + 1][1]) / 2,
//       2: 0,
//     };
//     // Project via point double dist from centre point
//     pv = trans_scale(pv, cp, sv[3]);
//   }
//   // Calculate arrow rotation
//   var p_;
//   p_ = sv ? pv : p1;
//   var rt;
//   rt = p_[1] > p2[1] ? 270 : 90;
//   if (p2[0] - p_[0] != 0) {
//     rt = rad2deg(atan((p2[1] - p_[1]) / (p2[0] - p_[0])));
//     rt = p_[0] > p2[0] ? rt + 180 : rt;
//   }
//   return '		<path d="M ' + p1[0] + ',' + p1[1] + ' ' + isset(pv)
//     ? 'Q ' + pv[0] + ',' + pv[1]
//     : 'L' +
//         ' ' +
//         p2[0] +
//         ',' +
//         p2[1] +
//         '"\n\
// 			style="fill:none;stroke:#' +
//         col +
//         ';stroke-opacity:1" />\n\
// 		<path transform=" translate(' +
//         p2[0] +
//         ',' +
//         p2[1] +
//         ') scale(' +
//         0.033 / dim +
//         ') rotate(' +
//         rt +
//         ')"\n\
// 			d="M 5.77,0.0 L -2.88,5.0 L -2.88,-5.0 L 5.77,0.0 z"\n\
// 			style="fill:#' +
//         col +
//         ';stroke-width:0;stroke-linejoin:round"/>' +
//         '\n\
// ';
// }

/** Converts svg into given format */
// TODO: function convert(svg, fmt, size) {
//   let opts = gen_image_opts(fmt, size, 'svg:-', '' + fmt + ':-');
//   let descriptorspec = {
//     0: {
//       0: 'pipe',
//       1: 'r',
//     },
//     1: {
//       0: 'pipe',
//       1: 'w',
//     },
//   };
//   let convert = proc_open(
//     '' + CONVERT + ' ' + opts + '',
//     descriptorspec,
//     pipes
//   );
//   fwrite(pipes[0], svg);
//   fclose(pipes[0]);
//   let img = null;
//   while (!feof(pipes[1])) {
//     img += fread(pipes[1], 1024);
//   }
//   fclose(pipes[1]);
//   proc_close(convert);
//   return img;
// }

/** Alternative version using files rather than pipes,
 * not desired because of collision possibilities.. */
// function convert_file(svg, fmt, size) {
//   var svgfile;
//   svgfile = fopen('/tmp/visualcube.svg', 'w');
//   fwrite(svgfile, svg);
//   fclose(svgfile);
//   var opts;
//   opts = gen_image_opts(
//     fmt,
//     size,
//     '/tmp/visualcube.svg',
//     '/tmp/visualcube.' + fmt + ''
//   );
//   var rsvg;
//   rsvg = exec('' + CONVERT + ' ' + opts + '');
//   var imgfile;
//   imgfile = fopen('/tmp/visualcube.' + fmt + '', 'r');
//   var img;
//   img = null;
//   __loop1: while (imgfile && !feof(imgfile)) {
//     img += fread(imgfile, 1024);
//   }
//   fclose(imgfile);
//   return img;
// }

/** Generate ImageMagick options depending on format */
// function gen_image_opts(fmt, size, infile, outfile) {
//   var inopts;
//   inopts = ' -density 600 -resize ' + size + 'x' + size;
//   var outopts;
//   outopts = ' -channel RGBA -alpha set';
//   //		$opts .= '+label "Generated by VisualCube"';
//   //		$opts .= ' -comment "Generated by VisualCube"';
//   //		$opts .= ' -caption "Generated by VisualCube"';
//   //		$opts = "-gaussian 1";
//   __loop1: switch (fmt) {
//     case 'png':
//       inopts += ' -background none';
//       outopts += ' -quality 100 -define png:format=png32';
//       break;
//     case 'gif':
//       inopts += ' -background none';
//       break;
//     case 'ico':
//       inopts += ' -background none';
//       break;
//     case 'jpg':
//       outopts += ' -quality 90';
//       break;
//   }
//   return '' + inopts + ' ' + infile + ' ' + outopts + ' ' + outfile + '';
// }

/** Sends image to browser */
// function display_img(img, fmt) {
//   var mime;
//   mime = fmt;
//   __loop1: switch (fmt) {
//     case 'jpe':
//     case 'jpg':
//       mime = 'jpeg';
//       break;
//     case 'svg':
//       mime = 'svg+xml';
//       break;
//     case 'ico':
//       mime = 'vnd.microsoft.icon';
//       break;
//   }
//   header('Content-type: image/' + mime + '');
//   //		header("Content-Length: " . filesize($img) ."; ");
//   console.log(img);
// }

// -----------------------------[ DB Access Functions ]--------------------------
// Return result of sql query as array
// function get_arrays(mysql_con, query) {
//   var result;
//   result = mysqli_query(mysql_con, query);
//   var count;
//   count = mysqli_num_rows(result);
//   if (count <= 0) {
//     return null;
//   }
//   var ary;
//   ary = {
//     0: count,
//   };
//   var i;
//   i = 0;
//   __loop1: while ((record = mysqli_fetch_array(result, MYSQLI_ASSOC))) {
//     var record;
//     ary[i] = record;
//     i++;
//   }
//   return ary;
// }

const facelet_svg = (p, fc, dim, cc, colourScheme, facelets) => {
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
        colourScheme,
        facelets
      );
    }
  }
  return svg;
};

// Renders the top rim of the R U L and B faces out from side of cube
function oll_svg(fc, rv, dim, p, cc, colourScheme, facelets) {
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
      colourScheme,
      facelets
    );
  }
  return svg;
}

/** Generates a polygon SVG tag for cube facelets */
function gen_facelet(p1, p2, p3, p4, seq, cc, colourScheme, facelets) {
  let fcol =
    colourScheme[['U', 'R', 'F', 'L', 'D', 'B', 'N', 'T'][facelets[seq]]];
  return `<polygon ${
    fcol === 't' ? 'fill-opacity="0"' : `fill='${fcol}'`
  } stroke='${cc}' points='${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${
    p3[1]
  } ${p4[0]},${p4[1]}'/>`;
}

const generateImage = ({
  outputFormat,
  view,
  rotationSequence,
  puzzleSize,
  colourScheme,
  distanceFromCube,
  backgroundColour,
  cubeOpacity,
  faceOpacity,
  facelets,
  alg,
  rv,
  ox,
  oy,
  vw,
  vh,
  sw,
  cubeColour,
  OUTLINE_WIDTH,
}) => {
  const p = initCube(rv, puzzleSize, distanceFromCube, rotationSequence);
  const ro = initRenderOrder(rv);

  let cube = `<svg xmlns='http://www.w3.org/2000/svg' width='${puzzleSize}' height='${puzzleSize}' viewBox='${ox} ${oy} ${vw} ${vh}'>`;

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
      cube += facelet_svg(
        p,
        ro[ri],
        puzzleSize,
        cubeColour,
        colourScheme,
        facelets
      );
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
      cube += facelet_svg(
        p,
        ro[ri],
        puzzleSize,
        cubeColour,
        colourScheme,
        facelets
      );
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
        colourScheme,
        facelets
      );
    }
    cube += '</g>';
  }
  // TODO: Draw Arrows
  // if (isset(arrows)) {
  // 	var awidth;
  // 	awidth = 0.12 / dim;
  // 	cube += '	<g style=\'opacity:1;stroke-opacity:1;stroke-width:' + awidth + ";stroke-linecap:round'>
  // 	";
  // 	__loop1:
  // 		for (i in arrows) {
  // 			a = arrows[i];
  // 			cube += gen_arrow(i, a[0], a[1], a[2], a[4], array_key_exists(3, a) ? a[3] : ac);
  // 		}
  // 	cube += '	</g>\n\
  // ';
  // }

  cube += '</svg>';

  let img = outputFormat === 'svg' ? cube : '';
  //convert(cube, fmt, size);
  // display_img(img, fmt);
  return cube;
};

export { generateImage };
