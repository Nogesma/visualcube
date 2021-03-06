// Permutes an NxNxN face definition according to the given alg
import R from 'ramda';

const fcs_pos = (r: number, c: number, o: number, d: number): number => {
  switch (o) {
    case 1:
      return d * r + c;
    case 2:
      return d * (r + 1) - 1 - c;
    case 3:
      return d * d - d * (r + 1) + c;
    case 4:
      return d * d - d * r - 1 - c;
    case 5:
      return d * c + r;
    case 6:
      return d * (c + 1) - 1 - r;
    case 7:
      return d * d - d * (c + 1) + r;
    case 8:
      return d * d - d * c - 1 - r;
  }
  return -1;
};

// Translations defined in $t2 are applied to $t1
const fcs_union = (t1: number[], t2: number[], offset: number): number[] => {
  const newT1 = R.clone(t1);
  for (let i in t2) {
    newT1[Number(i) + offset] = t2[i] + offset;
  }
  return newT1;
};

// Permutes given array, storing output in second array
const fcs_permute = (
  _in: number[],
  out: number[],
  perm: number[]
): number[] => {
  const newOut = R.clone(out);
  for (let i in _in) {
    newOut[i] = _in[perm[i]];
  }
  return newOut;
};

// Maps move names to a move id
function fcs_move_id(move: string): number {
  switch (move) {
    case 'y':
      return 0;
    case 'x':
      return 1;
    case 'z':
      return 2;
    case 'E':
      return 3;
    case 'M':
      return 4;
    case 'S':
      return 5;
    case 'U':
      return 6;
    case 'R':
      return 7;
    case 'F':
      return 8;
    case 'D':
      return 9;
    case 'L':
      return 10;
    case 'B':
      return 11;
    case 'u':
    case 'Uw':
      return 12;
    case 'r':
    case 'Rw':
      return 13;
    case 'f':
    case 'Fw':
      return 14;
    case 'd':
    case 'Dw':
      return 15;
    case 'l':
    case 'Lw':
      return 16;
    case 'b':
    case 'Bw':
      return 17;
  }
  return -1;
}

// Returns the power of a move with given suffix
const move_pow = (char: string): number => {
  switch (char) {
    case '2':
      return 2;
    case "'":
      return 3;
    case '3':
      return 3;
  }
  return 1;
};

// Parses an algorithm string into a move-id sequence
const fcs_parse_alg = (alg: string, dim: number): number[] => {
  let moves = [];
  let j = 0;
  let mvArray = R.split(' ', alg);
  for (const c of mvArray) {
    let pre = Number(R.match(/^\d/g, c)[0]) || 1;
    const mv = R.match(/[a-zA-Z]+/g, c)[0];
    const pow = R.match(/[\d\-']+$/g, c)[0];

    let mvID = fcs_move_id(mv);
    if (mvID > 0) {
      let powID = move_pow(pow);

      pre = pre > dim - 1 ? dim - 1 : pre;
      if (mvID >= 12) {
        mvID -= 6;
        pre = pre < 2 ? 2 : pre;
      }
      for (let k = 0; k < powID; k++) {
        moves[j++] = mvID < 6 ? mvID : 6 + (mvID - 6) * (dim - 1) + (pre - 1);
      }
    }
  }
  return moves;
};

const fcs_doperm = (fcs: number[], alg: string, dim: number): number[] => {
  let nf = dim * dim;
  // Generate basic move tables
  // Twist generic face
  let fc_twist = [];
  let fc_twist2 = [];
  for (let row = 0; row < dim; row++) {
    for (let col = 0; col < dim; col++) {
      fc_twist[row * dim + col] = (dim - col - 1) * dim + row;
      fc_twist2[row * dim + col] = col * dim + dim - row - 1;
    }
  }
  // Face order for slice turns
  let sl_fo = [
    [6, 5, 1, 6, 2, 4],
    [2, 6, 3, 5, 6, 0],
    [4, 0, 6, 1, 3, 6],
    [6, 2, 4, 6, 5, 1],
    [5, 6, 0, 2, 6, 3],
    [1, 3, 6, 4, 0, 6],
  ];
  // Sticker order for slice turns
  let sl_so = [
    [0, 1, 1, 0, 1, 1],
    [8, 0, 8, 8, 0, 5],
    [4, 7, 0, 1, 6, 0],
  ];
  // Twist individual slices
  let sl_twist: number[][][] = [];
  for (let lr = 0; lr < 6; lr++) {
    sl_twist.push([]);
    for (let sl = 0; sl < dim; sl++) {
      sl_twist[lr].push([]);
      for (let fc = 0; fc < 6; fc++) {
        if (sl_so[lr % 3][fc] !== 0) {
          for (let i = 0; i < dim; i++) {
            sl_twist[lr][sl][fc * nf + fcs_pos(sl, i, sl_so[lr % 3][fc], dim)] =
              sl_fo[lr][fc] * nf +
              fcs_pos(sl, i, sl_so[lr % 3][sl_fo[lr][fc]], dim);
          }
        }
      }
    }
  }

  // Initialise move tables
  const fc_moves: number[][] = [];
  for (let i = 0; i < dim * 6; i++) {
    fc_moves.push([]);
    for (let j = 0; j < nf * 6; j++) {
      fc_moves[i][j] = j;
    }
  }

  // Create move tables composed of simple units
  // Rotations
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < dim; j++) {
      fc_moves[i] = fcs_union(fc_moves[i], sl_twist[i][j], 0);
    }
    // Add twist moves for each end
    fc_moves[i] = fcs_union(fc_moves[i], fc_twist, i * dim * dim);
    fc_moves[i] = fcs_union(fc_moves[i], fc_twist2, (i + 3) * dim * dim);
  }

  // Centre-slice moves
  if (dim % 2 > 0) {
    fc_moves[3] = fcs_union(fc_moves[3], sl_twist[3][Math.floor(dim / 2)], 0);
    // E
    fc_moves[4] = fcs_union(fc_moves[4], sl_twist[4][Math.floor(dim / 2)], 0);
    // M
    fc_moves[5] = fcs_union(fc_moves[5], sl_twist[2][Math.floor(dim / 2)], 0);
    // S
  }
  // Normal Moves
  for (let ax = 0; ax < 3; ax++) {
    for (let dp = 0; dp < dim - 1; dp++) {
      // Primary axis end
      // Add twist move
      fc_moves[6 + ax * (dim - 1) + dp] = fcs_union(
        fc_moves[6 + ax * (dim - 1) + dp],
        fc_twist,
        ax * dim * dim
      );
      for (let sl = 0; sl <= dp; sl++) {
        // Add slice moves up to depth $dp
        fc_moves[6 + ax * (dim - 1) + dp] = fcs_union(
          fc_moves[6 + ax * (dim - 1) + dp],
          sl_twist[ax][sl],
          0
        );
      }
      // Secondary axis end
      // Add twist move
      fc_moves[6 + (3 + ax) * (dim - 1) + dp] = fcs_union(
        fc_moves[6 + (3 + ax) * (dim - 1) + dp],
        fc_twist,
        (3 + ax) * dim * dim
      );
      for (let sl = 0; sl <= dp; sl++) {
        // Add slice moves up to depth $dp
        fc_moves[6 + (3 + ax) * (dim - 1) + dp] = fcs_union(
          fc_moves[6 + (3 + ax) * (dim - 1) + dp],
          sl_twist[3 + ax][dim - sl - 1],
          0
        );
      }
    }
  }
  // Carry out moves
  let moves = fcs_parse_alg(alg, dim);
  let fcs_: number[] = [];
  for (let mv of moves) {
    fcs_ = fcs_permute(fcs, fcs_, fc_moves[mv]);
    let tmp = fcs;
    fcs = fcs_;
    fcs_ = tmp;
  }
  return fcs;
};

const invert_alg = (alg: string) => {
  const ALG_POW = ['', '2', "'"];
  let inv = '';
  let pow = 1;
  let pre = '';
  let i = alg.length - 1;
  while (i >= 0) {
    let c = alg.substr(i, 1);
    let mv = fcs_move_id(c);
    if (mv != -1) {
      // Retrive layer depth
      if (i > 0) {
        pre = alg.substr(i - 1, 1);
        if (
          isNaN(Number(pre)) ||
          (i > 1 && fcs_move_id(alg.substr(i - 2, 1)) != -1)
        ) {
          pre = '';
        } else {
          i--;
        }
      }
      // Invert and add the move
      inv += `${pre}${c}${ALG_POW[3 - pow]} `;
      pow = 1;
      pre = '';
    } else {
      pow = move_pow(alg.substr(i, 1));
    }
    i--;
  }
  return inv;
};

export { fcs_doperm, invert_alg };
