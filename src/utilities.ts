import R from 'ramda';

// Project 3D points onto a 2D plane
const project = (q: number[], d: number): number[] => [
  (q[0] * d) / q[2],
  (q[1] * d) / q[2],
  q[2],
];

// Returns whether a face is visible
const face_visible = (face: number, rv: number[][]): boolean =>
  rv[face][2] < -0.105;

// Returns svg for a cube outline
const outline_svg = (
  q: number[][][][],
  fc: number,
  cc: string,
  dim: number,
  OUTLINE_WIDTH: number
): string =>
  `<polygon fill='${cc}' stroke='${cc}' points='${
    q[fc][0][0][0] * OUTLINE_WIDTH
  },${q[fc][0][0][1] * OUTLINE_WIDTH} ${q[fc][dim][0][0] * OUTLINE_WIDTH},${
    q[fc][dim][0][1] * OUTLINE_WIDTH
  } ${q[fc][dim][dim][0] * OUTLINE_WIDTH},${
    q[fc][dim][dim][1] * OUTLINE_WIDTH
  } ${q[fc][0][dim][0] * OUTLINE_WIDTH},${q[fc][0][dim][1] * OUTLINE_WIDTH}'/>`;

// -------------------[ 3D Geometry Functions ]--------------------
// Move point by translation vector
const translate = (q: number[], t: number[]): number[] =>
  R.addIndex(R.map)((a, i) => R.add(t[i], <number>a), q);

const scale = (q: number[], f: number): number[] => R.map(R.multiply(f))(q);

function rotate(q: number[], ax: number, an: number): number[] {
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

// Scale point relative to position vector
// Translate each facelet to cf
const trans_scale = (q: number[], v: number[], f: number): number[] =>
  translate(scale(translate(q, [-v[0], -v[1], -v[2]]), f), v);

export {
  project,
  face_visible,
  outline_svg,
  trans_scale,
  rotate,
  translate,
  scale,
};
