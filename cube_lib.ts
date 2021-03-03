//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not im
// plemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented phptojs\JsPrinter\JsPrinter::pStmt_Nop
//not implemented reference param t1 by &
//not implemented reference param t2 by &
//not implemented reference param in by &
//not implemented reference param out by &
/*
	File: cube_lib.php
	Date: 02 Apr 2010
	Author(s): Conrad Rider (www.crider.co.uk)
	Description: Php library for modelling a Rubik's cube
	This file is part of VisualCube.
	VisualCube is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	VisualCube is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	You should have received a copy of the GNU Lesser General Public License
	along with VisualCube.  If not, see <http://www.gnu.org/licenses/>.
	Copyright (C) 2010 Conrad Rider
*/
// Face constants
U = 0;
R = 1;
F = 2;
D = 3;
L = 4;
B = 5;
// Corner Constants
URF = 0;
UFL = 1;
ULB = 2;
UBR = 3;
DFR = 4;
DLF = 5;
DBL = 6;
DRB = 7;
// Edge constants
UR = 0;
UF = 1;
UL = 2;
UB = 3;
DR = 4;
DF = 5;
DL = 6;
DB = 7;
FR = 8;
FL = 9;
BL = 10;
BR = 11;
// Mapping from face constants to face letters
FACE_NAMES = {
    U: "u",
    R: "r",
    F: "f",
    D: "d",
    L: "l",
    B: "b"
};
// A solved cube
SOLVED_CUBE = {
    0: {
        0: U,
        1: R,
        2: F,
        3: D,
        4: L,
        5: B
    },
    1: {
        0: URF,
        1: UFL,
        2: ULB,
        3: UBR,
        4: DFR,
        5: DLF,
        6: DBL,
        7: DRB
    },
    2: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0
    },
    3: {
        0: UR,
        1: UF,
        2: UL,
        3: UB,
        4: DR,
        5: DF,
        6: DL,
        7: DB,
        8: FR,
        9: FL,
        10: BL,
        11: BR
    },
    4: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0
    }
};
// Partial cubes used to verify the correct parts are solved
VCUBE = {
    "2FL": {
        0: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1,
            8: -1,
            9: -1,
            10: -1,
            11: -1
        },
        4: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1,
            8: -1,
            9: -1,
            10: -1,
            11: -1
        }
    },
    "2OFL": {
        0: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1
        },
        2: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1,
            8: -1,
            9: -1,
            10: -1,
            11: -1
        },
        4: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1,
            8: -1,
            9: -1,
            10: -1,
            11: -1
        }
    },
    "2O": {
        0: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1,
            8: -1,
            9: -1,
            10: -1,
            11: -1
        },
        4: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1,
            8: -1,
            9: -1,
            10: -1,
            11: -1
        }
    },
    "F2L": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OCLL": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OCLL_T": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 1,
            2: 2,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OCLL_U": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 2,
            2: 1,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OCLL_L": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 2,
            2: 0,
            3: 1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OCLL_H": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 2,
            1: 1,
            2: 2,
            3: 1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OCLL_PI": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 1,
            1: 2,
            2: 2,
            3: 1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OCLL_S": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 2,
            2: 2,
            3: 2,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OCLL_AS": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 1,
            1: 0,
            2: 1,
            3: 1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_OLL": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2L_CLL": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: URF,
            1: UFL,
            2: ULB,
            3: UBR,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2B": {
        0: {
            0: -1,
            1: R,
            2: -1,
            3: -1,
            4: L,
            5: -1
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: -1,
            6: DL,
            7: -1,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: -1,
            6: 0,
            7: -1,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2LS": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: -1,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: -1,
            9: 0,
            10: 0,
            11: 0
        }
    },
    "F2LS_EO": {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    }
};
// An array storing all cubie-level moves
CUBIE_MOVES = {
    0: {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: UBR,
            1: URF,
            2: UFL,
            3: ULB,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: UB,
            1: UR,
            2: UF,
            3: UL,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    1: {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: DFR,
            1: UFL,
            2: ULB,
            3: URF,
            4: DRB,
            5: DLF,
            6: DBL,
            7: UBR
        },
        2: {
            0: 2,
            1: 0,
            2: 0,
            3: 1,
            4: 1,
            5: 0,
            6: 0,
            7: 2
        },
        3: {
            0: FR,
            1: UF,
            2: UL,
            3: UB,
            4: BR,
            5: DF,
            6: DL,
            7: DB,
            8: DR,
            9: FL,
            10: BL,
            11: UR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    2: {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: UFL,
            1: DLF,
            2: ULB,
            3: UBR,
            4: URF,
            5: DFR,
            6: DBL,
            7: DRB
        },
        2: {
            0: 1,
            1: 2,
            2: 0,
            3: 0,
            4: 2,
            5: 1,
            6: 0,
            7: 0
        },
        3: {
            0: UR,
            1: FL,
            2: UL,
            3: UB,
            4: DR,
            5: FR,
            6: DL,
            7: DB,
            8: UF,
            9: DF,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 1,
            2: 0,
            3: 0,
            4: 0,
            5: 1,
            6: 0,
            7: 0,
            8: 1,
            9: 1,
            10: 0,
            11: 0
        }
    },
    3: {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: URF,
            1: UFL,
            2: ULB,
            3: UBR,
            4: DLF,
            5: DBL,
            6: DRB,
            7: DFR
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: UR,
            1: UF,
            2: UL,
            3: UB,
            4: DF,
            5: DL,
            6: DB,
            7: DR,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    4: {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: URF,
            1: ULB,
            2: DBL,
            3: UBR,
            4: DFR,
            5: UFL,
            6: DLF,
            7: DRB
        },
        2: {
            0: 0,
            1: 1,
            2: 2,
            3: 0,
            4: 0,
            5: 2,
            6: 1,
            7: 0
        },
        3: {
            0: UR,
            1: UF,
            2: BL,
            3: UB,
            4: DR,
            5: DF,
            6: FL,
            7: DB,
            8: FR,
            9: UL,
            10: DL,
            11: BR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    5: {
        0: {
            0: U,
            1: R,
            2: F,
            3: D,
            4: L,
            5: B
        },
        1: {
            0: URF,
            1: UFL,
            2: UBR,
            3: DRB,
            4: DFR,
            5: DLF,
            6: ULB,
            7: DBL
        },
        2: {
            0: 0,
            1: 0,
            2: 1,
            3: 2,
            4: 0,
            5: 0,
            6: 2,
            7: 1
        },
        3: {
            0: UR,
            1: UF,
            2: UL,
            3: BR,
            4: DR,
            5: DF,
            6: DL,
            7: BL,
            8: FR,
            9: FL,
            10: UB,
            11: DB
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 1,
            4: 0,
            5: 0,
            6: 0,
            7: 1,
            8: 0,
            9: 0,
            10: 1,
            11: 1
        }
    },
    6: {
        0: {
            0: U,
            1: F,
            2: L,
            3: D,
            4: B,
            5: R
        },
        1: {
            0: URF,
            1: UFL,
            2: ULB,
            3: UBR,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: UR,
            1: UF,
            2: UL,
            3: UB,
            4: DR,
            5: DF,
            6: DL,
            7: DB,
            8: FL,
            9: BL,
            10: BR,
            11: FR
        },
        4: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 1,
            9: 1,
            10: 1,
            11: 1
        }
    },
    7: {
        0: {
            0: B,
            1: R,
            2: U,
            3: F,
            4: L,
            5: D
        },
        1: {
            0: URF,
            1: UFL,
            2: ULB,
            3: UBR,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: UR,
            1: UB,
            2: UL,
            3: DB,
            4: DR,
            5: UF,
            6: DL,
            7: DF,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 0,
            1: 1,
            2: 0,
            3: 1,
            4: 0,
            5: 1,
            6: 0,
            7: 1,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    },
    8: {
        0: {
            0: L,
            1: U,
            2: F,
            3: R,
            4: D,
            5: B
        },
        1: {
            0: URF,
            1: UFL,
            2: ULB,
            3: UBR,
            4: DFR,
            5: DLF,
            6: DBL,
            7: DRB
        },
        2: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        },
        3: {
            0: UL,
            1: UF,
            2: DL,
            3: UB,
            4: UR,
            5: DF,
            6: DR,
            7: DB,
            8: FR,
            9: FL,
            10: BL,
            11: BR
        },
        4: {
            0: 1,
            1: 0,
            2: 1,
            3: 0,
            4: 1,
            5: 0,
            6: 1,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    }
};
// Now that the elementry moves are defined, the rest of the moves can be built
CUBIE_MOVES = {
    0: CUBIE_MOVES[0],
    1: CUBIE_MOVES[1],
    2: CUBIE_MOVES[2],
    3: CUBIE_MOVES[3],
    4: CUBIE_MOVES[4],
    5: CUBIE_MOVES[5],
    6: prod(array_copy(CUBIE_MOVES[0]), CUBIE_MOVES[6], 3),
    7: prod(array_copy(CUBIE_MOVES[1]), CUBIE_MOVES[7], 3),
    8: prod(array_copy(CUBIE_MOVES[2]), CUBIE_MOVES[8], 1),
    9: prod(array_copy(CUBIE_MOVES[3]), CUBIE_MOVES[6], 1),
    10: prod(array_copy(CUBIE_MOVES[4]), CUBIE_MOVES[7], 1),
    11: prod(array_copy(CUBIE_MOVES[5]), CUBIE_MOVES[8], 3),
    12: CUBIE_MOVES[6],
    13: CUBIE_MOVES[7],
    14: CUBIE_MOVES[8],
    15: prod(prod(array_copy(CUBIE_MOVES[0]), CUBIE_MOVES[3], 3), CUBIE_MOVES[6], 3),
    16: prod(prod(array_copy(CUBIE_MOVES[1]), CUBIE_MOVES[4], 3), CUBIE_MOVES[7], 3),
    17: prod(prod(array_copy(CUBIE_MOVES[2]), CUBIE_MOVES[5], 3), CUBIE_MOVES[8], 1)
};
// Mapping from power to chr to represent it
ALG_POW = {
    0: "",
    1: "2",
    2: "'"
};
// Returns the case identified by this alg (or -1 if not belonging to group),
// as well an amended alg with any rotations required to make it fit the group
function gen_state(moves, puzzle, group_id, is_ll) {
    //println(".nGENSTATE:.ninput moves=$moves");
    moves = trim_rotations(moves, is_ll);
    //println("trimmed moves=$moves");
    // 1. Apply different combinations of initial
    // and final moves until a solved state is found
    var prtns;
    prtns = {
        0: "",
        1: "x",
        2: "x'",
        3: "x2",
        4: "z",
        5: "z'",
        6: "y",
        7: "y'"
    };
    var frtns;
    frtns = {
        0: "",
        1: "x",
        2: "x'",
        3: "x2",
        4: "z",
        5: "z'",
        6: "y",
        7: "y'"
    };
    var valid;
    valid = false;
    var i;
    __loop1:
        for (i = 0; i < count(frtns) && !valid; i++) {
            var j;
            __loop2:
                for (j = 0; j < count(prtns) && !valid; j++) {
                    var cube;
                    cube = case_cube(prtns[j].moves.frtns[i]);
                    //println("testing cube: ".$prtns[$j].$moves.$frtns[$i]);
                    //printcube($cube, 3);
                    if (is_member(cube, group_id)) {
                        var prtn;
                        prtn = prtns[j];
                        var frtn;
                        frtn = frtns[i];
                        moves = "" + prtn + "" + moves + "" + frtn + "";
                        valid = true;
                    }
                }
        }
    // Stop here if alg not valid
    if (!valid) {
        return {
            0: -1,
            1: moves
        };
    }
    //println("corrected moves=$prtn$moves$frtn");
    // 2. Find angle to apply alg which results in lowest state id
    // This is necessery to ensure all rotations of same alg are given same state
    // Generate 4 case cubes
    var cubes;
    cubes = case_cubes2(moves, {
        0: "",
        1: "y",
        2: "y2",
        3: "y'"
    });
    var state;
    state = PHP_INT_MAX;
    var _key_;
    __loop1:
        for (_key_ in cubes) {
            cube = cubes[_key_];
            //printcube($cube, 3);
            // Check cube from all y rotation angles
            __loop2:
                for (i = 0; i < 4; i++) {
                    // Generate identifier for state (depends on alg purpose)
                    var s;
                    s = cube_state(cube, group_id);
                    //println($s);
                    // Set it as main ID if lowest found so-far
                    if (s < state && s != -1) {
                        state = s;
                    }
                    // Rotate cube by y
                    cube = prod(cube, CUBIE_MOVES[move_id("y")], 1);
                }
        }
    //println("detected state=$state");
    // Return cube state and moves which make cube state valid
    return {
        0: state,
        1: prtn,
        2: frtn
    };
}
// Rotate input alg to match reference alg's orientation and output corrected alg
function orient_alg(alg, ref, puzzle, group_id) {
    // Remove initial y rotations from alg
    alg = preg_replace("/^y[2']?/", "", alg);
    var cubes;
    cubes = case_cubes2(alg, {
        0: "",
        1: "y",
        2: "y2",
        3: "y'"
    });
    var ref_cube;
    ref_cube = case_cube(ref);
    //print_r2($ref_cube[1]);
    //print_r2($ref_cube[3]);
    var match;
    match = false;
    var _key_;
    __loop1:
        for (_key_ in cubes) {
            var cube;
            cube = cubes[_key_];
            // Now apply up to 3 y twists until the case matches
            var r;
            r = 0;
            __loop2:
                while (!match && r < 4) {
                    // Detection of identical case (inc cube oriented correctly)
                    // For OLL all LL orientations should match
                    __loop3: switch (group_id) {
                        case 1:
                            // OLL
                            match = match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4));
                            // CO
                            break;
                        case 2:
                            // PBL (permutation of all corners)
                            match = match(cube[1], ref_cube[1]);
                            // CP
                            break;
                        case 3:
                            // CLL (LL orientation + permutation)
                            match = match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4));
                            // CP
                            break;
                        case 4:
                            // OLL
                            match = match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[4], 0, 4), array_slice(ref_cube[4], 0, 4));
                            // EO
                            break;
                        case 5:
                            // PLL
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                        case 6:
                            // CLL
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4));
                            // CO
                            break;
                        case 7:
                            // ELL
                            match = match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4)) && match(array_slice(cube[4], 0, 4), array_slice(ref_cube[4], 0, 4));
                            // EO
                            break;
                        case 8:
                            // CMLL
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4));
                            // CO
                            break;
                        case 9:
                            // COLL
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4));
                            // CO
                            break;
                        case 10:
                            // ZBLL
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                        case 11:
                            // ELS
                            match = match(array_slice(cube[4], 0, 4), array_slice(ref_cube[4], 0, 4)) && els_FR(cube) == els_FR(ref_cube);
                            break;
                        case 12:
                            // CLS
                            match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4));
                            // CO
                            break;
                        case 13:
                            // ZBLL-T
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                        case 14:
                            // ZBLL-U
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                        case 15:
                            // ZBLL-L
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                        case 16:
                            // ZBLL-H
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                        case 17:
                            // ZBLL-Pi
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                        case 18:
                            // ZBLL-S
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                        case 19:
                            // ZBLL-As
                            match = match(array_slice(cube[1], 0, 4), array_slice(ref_cube[1], 0, 4)) && match(array_slice(cube[2], 0, 4), array_slice(ref_cube[2], 0, 4)) && match(array_slice(cube[3], 0, 4), array_slice(ref_cube[3], 0, 4));
                            // EP
                            break;
                    }
                    //if($match) println("r:$r true");
                    //else println("r:$r false");
                    //print_r2($cube[1]);
                    //print_r2($cube[3]);
                    // If no match found rotate cube and incrament rotation counter
                    if (!match) {
                        cube = prod(cube, CUBIE_MOVES[move_id("y")], 1);
                        r++;
                    }
                }
            if (match) {
                break;
            }
        }
    // Rotation required is the inverse of rotations used to match case
    if (r > 0) {
        alg = "y" + ALG_POW[3 - r] + alg;
    }
    return alg;
}
// Returns the location of the FR edge for ELS
function els_FR(cube) {
    var frp;
    frp = 0;
    // assuming its in position
    var j;
    __loop1:
        for (j = 0; j < 4; j++) {
            if (cube[3][j] == FR) {
                frp = j + 1;
                break;
            }
        }
    return frp;
}
// TODO: This function failes on alg... x' U' R U L' U2 R' U' L' U' L2 u r2 U' z ... part of ZBLL-PI, or H
// U' l2 u R2 U' R' U' L' U2 R' U L U' ... from ZBLL-PI
// Returns true if the cube state is a member of the given group
function is_member(cube, group_id) {
    //echo "is member of? $group_id :";
    //printcube($cube, 3);
    // Check cube from all y rotation angles
    var i;
    __loop1:
        for (i = 0; i < 4; i++) {
            //println("|".$cube[2][0].", ".$cube[2][1].", ".$cube[2][2].", ".$cube[2][3]."|");
            //printcube($cube, 3);
            var j;
            __loop2:
                for (j = 0; j < 4; j++) {
                    if (is_member_strict(cube, group_id)) {
                        return true;
                    }
                    // Rotate cube
                    cube = prod(cube, CUBIE_MOVES[move_id("y")], 1);
                }
            // Rotate U-Layer
            cube = prod(cube, CUBIE_MOVES[move_id("U")], 1);
        }
    return false;
}
// Returns true if the cube state is a member of the given group when AUF is allowed
function is_member_auf(cube, group_id) {
    //echo "is member of? $group_id :";
    //printcube($cube, 3);
    // Check cube from all auf rotation angles
    var i;
    __loop1:
        for (i = 0; i < 4; i++) {
            //println("|".$cube[2][0].", ".$cube[2][1].", ".$cube[2][2].", ".$cube[2][3]."|");
            //printcube($cube, 3);
            if (is_member_strict(cube, group_id)) {
                return true;
            }
            // Rotate U-Layer
            cube = prod(cube, CUBIE_MOVES[move_id("U")], 1);
        }
    return false;
}
function is_member_strict(cube, group_id) {
    __loop1: switch (group_id) {
        case 1:
            if (match(cube, VCUBE["2OFL"])) {
                return true;
            }
            break;
        // OLL
        // OLL
        case 2:
            if (match(cube, VCUBE["2O"])) {
                return true;
            }
            break;
        // PBL
        // PBL
        case 3:
            if (match(cube, VCUBE["2FL"])) {
                return true;
            }
            break;
        // CLL
        // CLL
        case 4:
            if (match(cube, VCUBE["F2L"])) {
                return true;
            }
            break;
        // OLL
        // OLL
        case 5:
            if (match(cube, VCUBE["F2L_OLL"])) {
                return true;
            }
            break;
        // PLL
        // PLL
        case 6:
            if (match(cube, VCUBE["F2L"])) {
                return true;
            }
            break;
        // CLL
        // CLL
        case 7:
            if (match(cube, VCUBE["F2L_CLL"])) {
                return true;
            }
            break;
        // ELL
        // ELL
        case 8:
            if (match(cube, VCUBE["F2B"])) {
                return true;
            }
            break;
        // CMLL
        // CMLL
        case 9:
            if (match(cube, VCUBE["F2L_OCLL"])) {
                return true;
            }
            break;
        // COLL
        // COLL
        case 10:
            if (match(cube, VCUBE["F2L_OCLL"])) {
                return true;
            }
            break;
        // ZBLL
        // ZBLL
        case 11:
            if (match(cube, VCUBE["F2LS"])) {
                return true;
            }
            break;
        // ELS
        // ELS
        case 12:
            if (match(cube, VCUBE["F2LS_EO"])) {
                return true;
            }
            break;
        // CLS
        // CLS
        case 13:
            if (match(cube, VCUBE["F2L_OCLL_T"])) {
                return true;
            }
            break;
        // ZBLL-T
        // ZBLL-T
        case 14:
            if (match(cube, VCUBE["F2L_OCLL_U"])) {
                return true;
            }
            break;
        // ZBLL-U
        // ZBLL-U
        case 15:
            if (match(cube, VCUBE["F2L_OCLL_L"])) {
                return true;
            }
            break;
        // ZBLL-L
        // ZBLL-L
        case 16:
            if (match(cube, VCUBE["F2L_OCLL_H"])) {
                return true;
            }
            break;
        // ZBLL-H
        // ZBLL-H
        case 17:
            if (match(cube, VCUBE["F2L_OCLL_PI"])) {
                return true;
            }
            break;
        // ZBLL-PI
        // ZBLL-PI
        case 18:
            if (match(cube, VCUBE["F2L_OCLL_S"])) {
                return true;
            }
            break;
        // ZBLL-S
        // ZBLL-S
        case 19:
            if (match(cube, VCUBE["F2L_OCLL_AS"])) {
                return true;
            }
            break;
        // ZBLL-AS
    }
    return false;
}
// Returns a value uniquely identifying this cube state in this group
function cube_state(cube, group_id) {
    __loop1: switch (group_id) {
        case 1:
            return encode_o(array_slice(cube[2], 0, 3), 3);
        // CO   (2x2 OLL)
        // CO   (2x2 OLL)
        case 2:
            return encode_p(cube[1]);
        // CP (all corners)           (PBL)
        // CP (all corners)           (PBL)
        case 3:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27;
        // CP
        // CP
        case 4:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_o(array_slice(cube[4], 0, 3), 2) * 27;
        // EO (* 3^3)
        // EO (* 3^3)
        case 5:
            return encode_p(array_slice(cube[1], 0, 4), 3) + encode_p(array_slice(cube[3], 0, 4)) * 24;
        // EO (* 4!)
        // EO (* 4!)
        case 6:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27;
        // CP
        // CP
        case 7:
            return encode_o(array_slice(cube[4], 0, 3), 2) + encode_p(array_slice(cube[3], 0, 4)) * 8;
        // EP
        // EP
        case 8:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27;
        // CP
        // CP
        case 9:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27;
        // CP
        // CP
        case 10:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27 + encode_p(array_slice(cube[3], 0, 4)) * 27 * 24;
        // EP
        // EP
        case 11:
            // ELS
            // This must encode orientation of the 4 top edges (fifth is determined by other 4)
            // along with the position of the FR edge
            return encode_o(array_slice(cube[4], 0, 4), 2) + els_FR(cube) * 16;
        // EO(5 edges) + position of FR
        // EO(5 edges) + position of FR
        case 12:
            // CLS must track the orientation of the 5 corners (determined by o of 4 top ones)
            return encode_o(array_slice(cube[2], 0, 4), 3);
        // CO
        // CO
        case 13:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27 + encode_p(array_slice(cube[3], 0, 4)) * 27 * 24;
        // EP
        // EP
        case 14:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27 + encode_p(array_slice(cube[3], 0, 4)) * 27 * 24;
        // EP
        // EP
        case 15:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27 + encode_p(array_slice(cube[3], 0, 4)) * 27 * 24;
        // EP
        // EP
        case 16:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27 + encode_p(array_slice(cube[3], 0, 4)) * 27 * 24;
        // EP
        // EP
        case 17:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27 + encode_p(array_slice(cube[3], 0, 4)) * 27 * 24;
        // EP
        // EP
        case 18:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27 + encode_p(array_slice(cube[3], 0, 4)) * 27 * 24;
        // EP
        // EP
        case 19:
            return encode_o(array_slice(cube[2], 0, 3), 3) + encode_p(array_slice(cube[1], 0, 4)) * 27 + encode_p(array_slice(cube[3], 0, 4)) * 27 * 24;
        // EP
    }
    return -1;
}
// Returs the cube-state the given alg solves
function case_cube(alg) {
    // Apply inverse to get state which alg solves
    alg = invert_alg(alg);
    var cube;
    cube = array_copy(SOLVED_CUBE);
    return apply_alg(alg, cube);
}
// Returns a set of case cubes representing the state of the
// cube the alg solves, given the rotation was applied first
function case_cubes(alg, prerot) {
    // Apply inverse to get state which alg solves
    alg = invert_alg(alg);
    var i;
    __loop1:
        for (i in prerot) {
            var rtn;
            rtn = prerot[i];
            var cubes;
            cubes[i] = apply_alg(alg.invert_alg(rtn), array_copy(SOLVED_CUBE));
        }
    return cubes;
}
// Returns a set of case cubes representing the state of the
// cube the alg solves, given the rotation was applied last
function case_cubes2(alg, postrot) {
    // Apply inverse to get state which alg solves
    alg = invert_alg(alg);
    var i;
    __loop1:
        for (i in postrot) {
            var rtn;
            rtn = postrot[i];
            var cubes;
            cubes[i] = apply_alg(invert_alg(rtn).alg, array_copy(SOLVED_CUBE));
        }
    return cubes;
}
// Returns the move required to rotate the cube to an upright position
function upright(cube) {
    // search for U face centre
    var upos;
    upos = 0;
    var i;
    __loop1:
        for (i in cube[0]) {
            var c;
            c = cube[0][i];
            if (c == U) {
                upos = i;
                break;
            }
        }
    var move;
    move = "";
    __loop1:
        switch (upos) {
            case R:
                move = "z'";
                break;
            case L:
                move = "z";
                break;
            case F:
                move = "x";
                break;
            case B:
                move = "x'";
                break;
            case D:
                move = "x2";
                break;
        }
    return move;
}
// Convert cubie cube to face cube, using the default facelet identifiers
function face_cube(cube, dim) {
    // Construct default facelet id scheme
    var f;
    __loop1:
        for (f = 0; f < 6; f++) {
            var i;
            __loop2:
                for (i = 0; i < dim; i++) {
                    var j;
                    __loop3:
                        for (j = 0; j < dim; j++) {
                            var fd;
                            fd += f;
                        }
                }
        }
    return facelet_cube(cube, dim, fd);
}
// Convert cubie cube to facelet cube mapping each facelet
// to the given facelet id sequence
function facelet_cube(cube, d, fi) {
    // Facelet constants
    // Dimension/2
    var h;
    h = parseInt(d / 2);
    // Dimension squared
    var s;
    s = d * d;
    // Half of dimension squared
    var m;
    m = parseInt(s / 2);
    // Map centre positions to facelet ids
    var mfid;
    mfid = {
        0: fi[U * s + m],
        1: fi[R * s + m],
        2: fi[F * s + m],
        3: fi[D * s + m],
        4: fi[L * s + m],
        5: fi[B * s + m]
    };
    // Map the corner positions to facelet ids
    var cfid;
    cfid = {
        0: {
            0: fi[(U + 1) * s - 1],
            1: fi[R * s],
            2: fi[F * s + d - 1]
        },
        1: {
            0: fi[(U + 1) * s - d],
            1: fi[F * s],
            2: fi[L * s + d - 1]
        },
        2: {
            0: fi[U * s],
            1: fi[L * s],
            2: fi[B * s + d - 1]
        },
        3: {
            0: fi[U * s + d - 1],
            1: fi[B * s],
            2: fi[R * s + d - 1]
        },
        4: {
            0: fi[D * s + d - 1],
            1: fi[(F + 1) * s - 1],
            2: fi[(R + 1) * s - d]
        },
        5: {
            0: fi[D * s],
            1: fi[(L + 1) * s - 1],
            2: fi[(F + 1) * s - d]
        },
        6: {
            0: fi[(D + 1) * s - d],
            1: fi[(B + 1) * s - 1],
            2: fi[(L + 1) * s - d]
        },
        7: {
            0: fi[(D + 1) * s - 1],
            1: fi[(R + 1) * s - 1],
            2: fi[(B + 1) * s - d]
        }
    };
    // Map the edge positions to facelet ids
    var efid;
    efid = {
        0: {
            0: fi[U * s + m + h],
            1: fi[R * s + h]
        },
        1: {
            0: fi[(U + 1) * s - 1 - h],
            1: fi[F * s + h]
        },
        2: {
            0: fi[U * s + m - h],
            1: fi[L * s + h]
        },
        3: {
            0: fi[U * s + h],
            1: fi[B * s + h]
        },
        4: {
            0: fi[D * s + m + h],
            1: fi[(R + 1) * s - 1 - h]
        },
        5: {
            0: fi[D * s + h],
            1: fi[(F + 1) * s - 1 - h]
        },
        6: {
            0: fi[D * s + m - h],
            1: fi[(L + 1) * s - 1 - h]
        },
        7: {
            0: fi[(D + 1) * s - 1 - h],
            1: fi[(B + 1) * s - 1 - h]
        },
        8: {
            0: fi[F * s + m + h],
            1: fi[R * s + m - h]
        },
        9: {
            0: fi[F * s + m - h],
            1: fi[L * s + m + h]
        },
        10: {
            0: fi[B * s + m + h],
            1: fi[L * s + m - h]
        },
        11: {
            0: fi[B * s + m - h],
            1: fi[R * s + m + h]
        }
    };
    //print_r($efid);
    /*
		// Map the corner positions to facelets
		$ccol = Array(
			Array($U, $R, $F), Array($U, $F, $L), Array($U, $L, $B), Array($U, $B, $R),
			Array($D, $F, $R), Array($D, $L, $F), Array($D, $B, $L), Array($D, $R, $B));
		// Map the edge positions to facelets
		$ecol = Array(
			Array($U, $R), Array($U, $F), Array($U, $L),
			Array($U, $B), Array($D, $R), Array($D, $F),
			Array($D, $L), Array($D, $B), Array($F, $R),
			Array($F, $L), Array($B, $L), Array($B, $R));
*/
    // Map of centre facelet positions
    var mpos;
    mpos = {
        0: U * s + m,
        1: R * s + m,
        2: F * s + m,
        3: D * s + m,
        4: L * s + m,
        5: B * s + m
    };
    // Map of corner facelet positions (for any dimensoin of cube)
    var cpos;
    cpos = {
        0: {
            0: (U + 1) * s - 1,
            1: R * s,
            2: F * s + d - 1
        },
        1: {
            0: (U + 1) * s - d,
            1: F * s,
            2: L * s + d - 1
        },
        2: {
            0: U * s,
            1: L * s,
            2: B * s + d - 1
        },
        3: {
            0: U * s + d - 1,
            1: B * s,
            2: R * s + d - 1
        },
        4: {
            0: D * s + d - 1,
            1: (F + 1) * s - 1,
            2: (R + 1) * s - d
        },
        5: {
            0: D * s,
            1: (L + 1) * s - 1,
            2: (F + 1) * s - d
        },
        6: {
            0: (D + 1) * s - d,
            1: (B + 1) * s - 1,
            2: (L + 1) * s - d
        },
        7: {
            0: (D + 1) * s - 1,
            1: (R + 1) * s - 1,
            2: (B + 1) * s - d
        }
    };
    // Map edge facelet positions (for any dimensoin)
    var epos;
    epos = {
        0: {
            0: U * s + m + h,
            1: R * s + h
        },
        1: {
            0: (U + 1) * s - 1 - h,
            1: F * s + h
        },
        2: {
            0: U * s + m - h,
            1: L * s + h
        },
        3: {
            0: U * s + h,
            1: B * s + h
        },
        4: {
            0: D * s + m + h,
            1: (R + 1) * s - 1 - h
        },
        5: {
            0: D * s + h,
            1: (F + 1) * s - 1 - h
        },
        6: {
            0: D * s + m - h,
            1: (L + 1) * s - 1 - h
        },
        7: {
            0: (D + 1) * s - 1 - h,
            1: (B + 1) * s - 1 - h
        },
        8: {
            0: F * s + m + h,
            1: R * s + m - h
        },
        9: {
            0: F * s + m - h,
            1: L * s + m + h
        },
        10: {
            0: B * s + m + h,
            1: L * s + m - h
        },
        11: {
            0: B * s + m - h,
            1: R * s + m + h
        }
    };
    // Corners
    var i;
    __loop1:
        for (i = 0; i < 8; i++) {
            var j;
            j = cube[1][i];
            // cornercubie with index j is at
            // cornerposition with index i
            var o;
            o = cube[2][i];
            // Orientation of this cubie
            var n;
            __loop2:
                for (n = 0; n < 3; n++) {
                    var fo;
                    fo[cpos[i][(n + o) % 3]] = cfid[j][n];
                }
        }
    //print_r($mfid);
    //echo ".n<br/>";
    // Pieces only applicable to odd sized puzzles
    if (d % 2 == 1) {
        // Centers
        __loop1: for (i = 0; i < 6; i++) {
            //echo ".n<br/>".$cube[0][$i];
            fo[mpos[i]] = mfid[cube[0][i]];
        }
        // Centre edges
        __loop1: for (i = 0; i < 12; i++) {
            j = cube[3][i];
            // edgecubie with index j is at edgeposition with index i
            o = cube[4][i];
            // Orientation of this cubie
            __loop2:
                for (n = 0; n < 2; n++) {
                    fo[epos[i][(n + o) % 2]] = efid[j][n];
                }
        }
    }
    //print_r( $fo);
    return fo;
}
// Convert cubie cube to letter cube (letters representing facelets)
function letter_cube(cube, dim) {
    var fc;
    fc = face_cube(cube, dim);
    var i;
    __loop1:
        for (i = 0; i < count(fc); i++) {
            var lc;
            lc[i] = FACE_NAMES[fc[i]];
        }
    return implode(lc);
}
// Convert cubie cube to colour cube
function col_cube(cube, dim) {
    // Sheme mapping
    var FACE_COL;
    FACE_COL = {
        "u": "y",
        "r": "r",
        "f": "b",
        "d": "w",
        "l": "o",
        "b": "g"
    };
    var fc;
    fc = face_cube(cube, dim);
    // Translate face defs into colour defs
    var i;
    __loop1:
        for (i = 0; i < strlen(fc); i++) {
            var col;
            col += FACE_COL[fc[i]];
        }
    return col;
}
// Print a cube to screen for debugging
function printcube(cube, dim) {
    var fc;
    fc = letter_cube(cube, dim);
    println("<img src="
    visualcube.php ? fmt = gif & fd = "+fc+"
        ">"
);
}
// Applys an alg to the given cube
function apply_alg(alg, cube) {
    var i;
    i = 0;
    var len;
    len = strlen(alg);
    __loop1:
        while (i < len) {
            var move;
            move = move_id(substr(alg, i, 1));
            if (move >= 0) {
                var pow;
                pow = move_pow(substr(alg, i + 1, 1));
                if (pow > 1) {
                    i++;
                }
                // Make the move
                cube = prod(cube, CUBIE_MOVES[move], pow);
            }
            i++;
        }
    return cube;
}
// Formats an inputed alg to remove dissallowed characters and standardise notation
function format_alg(moves) {
    // Remove characters not allowed in an alg
    var r;
    r = preg_replace("/[^UDLRFBudlrfbMESxyzw'`23]/", "", moves);
    r = preg_replace("/[3`]/", "'", r);
    // Replace 3 or ` with a '
    r = preg_replace("/2'|'2/", "2", r);
    // Replace 2' or '2 with a 2
    // Fix wide notation
    if (preg_match("/w/", r)) {
        r = preg_replace("/Uw/", "u", r);
        r = preg_replace("/Rw/", "r", r);
        r = preg_replace("/Fw/", "f", r);
        r = preg_replace("/Dw/", "d", r);
        r = preg_replace("/Lw/", "l", r);
        r = preg_replace("/Bw/", "b", r);
        // now remove any extra w's
        r = preg_replace("/w/", "", r);
    }
    // Merge multiple moves/rotations of same face
    //println( "init moves=|$moves|");
    return compress_alg(r);
    //println("compressed moves=|$moves|");
}
// Removes all initial and final rotations from a cube
function trim_rotations(alg, is_ll) {
    //echo "isll?$is_ll";
    // Remove AUFs if its an LL alg
    if (is_ll) {
        alg = remove_auf(alg);
    }
    // Strip all initial rotations
    alg = preg_replace("/^([xyz][2']?)+/", "", alg);
    // Strip all final rotations
    alg = preg_replace("/([xyz][2']?)+$/", "", alg);
    //echo "moves=|$moves|";
    return alg;
}
// Removes AUFs and replaces them with y rotations
function remove_auf(alg) {
    var n;
    n = strlen(alg);
    var i;
    __loop1:
        for (i = 0; i < n; i++) {
            var c;
            c = substr(alg, i, 1);
            if (c == "U") {
                alg[i] = "y";
            } else {
                if (preg_match("/[^yU2'\\s]/", c)) {
                    // anything other than y and U turns are no longer aufs
                    break;
                }
            }
        }
    __loop1:
        for (i = n - 1; i > -1; i--) {
            c = substr(alg, i, 1);
            if (c == "U") {
                alg[i] = "y";
            } else {
                if (preg_match("/[^yU2'\\s]/", c)) {
                    // anything other than y and U turns are no longer aufs
                    break;
                }
            }
        }
    return compress_alg(alg);
}
// Inserts spaces in an alg for display
function expand_alg(alg) {
    var n;
    n = strlen(alg);
    var i;
    i = 1;
    var exp;
    exp = substr(alg, 0, 1);
    __loop1:
        while (i < n) {
            var c;
            c = substr(alg, i, 1);
            if (move_id(c) != -1) {
                exp += " ";
            }
            exp += c;
            i++;
        }
    return exp;
}
// Merges unnecessery repeated moves of the same face
function compress_alg(alg) {
    var merge_done;
    merge_done = true;
    __loop1:
        while (merge_done && strlen(alg) > 1) {
            var n;
            n = strlen(alg);
            var i;
            i = 0;
            merge_done = false;
            __loop2:
                while (i < n) {
                    var move;
                    move = alg[i];
                    if (move_id(move) != -1) {
                        var pow;
                        pow = 1;
                        if (i < n - 1) {
                            pow = move_pow(alg[i + 1]);
                        }
                        if (pow > 1) {
                            i++;
                        }
                        // If moves the same, then simply add up powers
                        if (lmove == move) {
                            var lmove, lpow;
                            lpow += pow;
                            merge_done = true;
                        } else {
                            lpow = lpow % 4;
                            if (lpow > 0) {
                                var malg;
                                malg += lmove.ALG_POW[lpow - 1];
                            }
                            lpow = pow;
                            lmove = move;
                        }
                    }
                    i++;
                }
            // Add final move
            lpow = lpow % 4;
            if (lpow > 0) {
                malg += lmove.ALG_POW[lpow - 1];
            }
            alg = malg;
            malg = null;
            lmove = null;
            lpow = null;
        }
    return alg;
}

// Returns an array of algorithm statistics
// including, STM, HTM, QTM and GEN
function alg_stats(alg) {
    var n;
    n = strlen(alg);
    var i;
    i = 0;
    var gen;
    gen = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    };
    __loop1:
        while (i < n) {
            var move;
            move = move_id(substr(alg, i, 1));
            if (move != -1) {
                var pow;
                pow = 1;
                if (i < n - 1) {
                    pow = move_pow(substr(alg, i + 1, 1));
                }
                // If move not a rotation
                if (move <= 14) {
                    var stm;
                    stm++;
                    var htm;
                    htm++;
                    var qtm_;
                    qtm_ = 1;
                    // If its a slice move
                    if (move >= 12 && move <= 14) {
                        htm++;
                        qtm_ = 2;
                    }
                    if (pow == 2) {
                        qtm_ *= 2;
                    }
                    var qtm;
                    qtm += qtm_;
                    gen[move >= 6 ? move - 6 : move] = 1;
                }
            }
            i++;
        }
    var gn;
    gn = 0;
    var _key_;
    __loop1:
        for (_key_ in gen) {
            var g;
            g = gen[_key_];
            gn += g;
        }
    return {
        0: stm,
        1: htm,
        2: qtm,
        3: gn
    };
}
// Encode orientation
function encode_o(data, mod) {
    var o;
    o = 0;
    var i;
    __loop1:
        for (i = 0; i < count(data); i++) {
            o = o * mod + data[i];
        }
    return o;
}
// Encode permutation
function encode_p(data) {
    var p;
    p = 0;
    var n;
    n = count(data);
    var i;
    __loop1:
        for (i = 0; i < n - 1; i++) {
            p = p * (n - i + 1);
            var j;
            __loop2:
                for (j = i + 1; j < n; j++) {
                    if (data[i] > data[j]) {
                        p += 1;
                    }
                }
        }
    return p;
}
// Returns whether the cubes match
// Entries of -1 are counted as matching
function match(cube1, cube2) {
    var i;
    __loop1:
        for (i = 0; i < count(cube1); i++) {
            if (is_array(cube1[i])) {
                if (!match(cube1[i], cube2[i])) {
                    return false;
                }
            } else {
                if (!(cube1[i] == cube2[i] || cube1[i] == -1 || cube2[i] == -1)) {
                    return false;
                }
            }
        }
    return true;
}
// Permutes and orients cube1 by cube2 n times
function prod(cube1, cube2, n) {
    var i;
    __loop1:
        for (i = 0; i < n; i++) {
            // Centres
            var tmp;
            tmp = {};
            var m;
            __loop2:
                for (m = 0; m < 6; m++) {
                    // Permute center
                    tmp[0][m] = cube1[0][cube2[0][m]];
                }
            // Corners
            var c;
            __loop2:
                for (c = 0; c < 8; c++) {
                    // Permute corner
                    tmp[1][c] = cube1[1][cube2[1][c]];
                    // Orient corner
                    tmp[2][c] = (cube1[2][cube2[1][c]] + cube2[2][c]) % 3;
                }
            // Edges
            var e;
            __loop2:
                for (e = 0; e < 12; e++) {
                    // Permute edge
                    tmp[3][e] = cube1[3][cube2[3][e]];
                    // Orient edge
                    tmp[4][e] = (cube1[4][cube2[3][e]] + cube2[4][e]) % 2;
                }
            cube1 = tmp;
        }
    return cube1;
}

// Maps move names to a move id
function move_id(move) {
     switch (move) {
        case "U":
            return 0;
        case "R":
            return 1;
        case "F":
            return 2;
        case "D":
            return 3;
        case "L":
            return 4;
        case "B":
            return 5;
        case "u":
            return 6;
        case "r":
            return 7;
        case "f":
            return 8;
        case "d":
            return 9;
        case "l":
            return 10;
        case "b":
            return 11;
        case "E":
            return 12;
        case "M":
            return 13;
        case "S":
            return 14;
        case "y":
            return 15;
        case "x":
            return 16;
        case "z":
            return 17;
    }
    return -1;
}
// -----------------[ NxNxN Face Cube ]---------------



