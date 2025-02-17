const classesMap = new Map([
	[1, 'b_pawn'],
	[2, 'b_rook'],
	[3, 'b_knight'],
	[4, 'b_bishop'],
	[5, 'b_queen'],
	[6, 'b_king'],
	[7, 'w_pawn'],
	[8, 'w_rook'],
	[9, 'w_knight'],
	[10, 'w_bishop'],
	[11, 'w_queen'],
	[12, 'w_king']
]);
/* const defaultBoard = [
	[2, 3, 4, 5, 6, 4, 3, 2],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[7, 7, 7, 7, 7, 7, 7, 7],
	[8, 9, 10, 11, 12, 10, 9, 8]
]; */
const defaultBoard = [
	[2, 3, 4, 5, 6, 4, 3, 2],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[7, 7, 7, 7, 7, 7, 7, 7],
	[8, 9, 10, 11, 12, 10, 9, 8]
];

function hasWhiteDiagonalPieceOnTile (x, y, board) {
	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 10 || board[y + a][x + a] == 11) return true;
		if (board[y + a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 10 || board[y - a][x - a] == 11) return true;
		if (board[y - a][x - a] != 0) break;
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 10 || board[y - a][x + a] == 11) return true;
		if (board[y - a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 10 || board[y + a][x - a] == 11) return true;
		if (board[y + a][x - a] != 0) break;
	}

	return false;
}

function hasWhitePerpendicularPieceOnTile (x, y, board) {
	let isCapturing = false;

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 8 || board[y][cx] == 11;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 8 || board[y][cx] == 11;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 8 || board[cy][x] == 11;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 8 || board[cy][x] == 11;
			break;
		}
	}

	return isCapturing;
}

function hasWhitePawnOnTile (x, y, board) {
	return board[y + 1] && (board[y + 1][x + 1] == 7 || board[y + 1][x - 1] == 7);
}

function hasWhiteKnightOnTile (x, y, board) {
	if (board[y + 1]) {
		if (board[y + 1][x + 2] == 9) return true;
		if (board[y + 1][x - 2] == 9) return true;
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 2] == 9) return true;
		if (board[y - 1][x - 2] == 9) return true;
	}

	if (board[y + 2]) {
		if (board[y + 2][x + 1] == 9) return true;
		if (board[y + 2][x - 1] == 9) return true;
	}

	if (board[y - 2]) {
		if (board[y - 2][x + 1] == 9) return true;
		if (board[y - 2][x - 1] == 9) return true;
	}

	return false;
}

function hasWhiteKingOnTile (x, y, board) {
	return (board[y + 1] && (board[y + 1][x] == 12 || board[y + 1][x + 1] == 12 || board[y + 1][x - 1] == 12)) ||
		(board[y - 1] && (board[y - 1][x] == 12 || board[y - 1][x + 1] == 12 || board[y - 1][x - 1] == 12)) ||
		board[y][x + 1] == 12 ||
		board[y][x - 1] == 12;
}

function hasBlackDiagonalPieceOnTile (x, y, board) {
	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 4 || board[y + a][x + a] == 5) return true;
		if (board[y + a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 4 || board[y - a][x - a] == 5) return true;
		if (board[y - a][x - a] != 0) break;
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 4 || board[y - a][x + a] == 5) return true;
		if (board[y - a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 4 || board[y + a][x - a] == 5) return true;
		if (board[y + a][x - a] != 0) break;
	}

	return false;
}

function hasBlackPerpendicularPieceOnTile (x, y, board) {
	let isCapturing = false;

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 2 || board[y][cx] == 5;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 2 || board[y][cx] == 5;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 2 || board[cy][x] == 5;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 2 || board[cy][x] == 5;
			break;
		}
	}

	return isCapturing;
}

function hasBlackPawnOnTile (x, y, board) {
	return board[y - 1] && (board[y - 1][x + 1] == 1 || board[y - 1][x - 1] == 1);
}

function hasBlackKnightOnTile (x, y, board) {
	if (board[y + 1]) {
		if (board[y + 1][x + 2] == 3) return true;
		if (board[y + 1][x - 2] == 3) return true;
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 2] == 3) return true;
		if (board[y - 1][x - 2] == 3) return true;
	}

	if (board[y + 2]) {
		if (board[y + 2][x + 1] == 3) return true;
		if (board[y + 2][x - 1] == 3) return true;
	}

	if (board[y - 2]) {
		if (board[y - 2][x + 1] == 3) return true;
		if (board[y - 2][x - 1] == 3) return true;
	}

	return false;
}

function hasBlackKingOnTile (x, y, board) {
	return (board[y + 1] && (board[y + 1][x] == 6 || board[y + 1][x + 1] == 6 || board[y + 1][x - 1] == 6)) ||
		(board[y - 1] && (board[y - 1][x] == 6 || board[y - 1][x + 1] == 6 || board[y - 1][x - 1] == 6)) ||
		board[y][x + 1] == 6 ||
		board[y][x - 1] == 6;
}

function isCaptureKingByBlackPawn (x, y, board) {
	return board[y + 1][x + 1] == 12 || board[y + 1][x - 1] == 12;
}

function isCaptureKingByBlackRook (x, y, board) {
	let isCapturing = false;

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 12;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 12;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 12;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 12;
			break;
		}
	}

	return isCapturing;
}

function isCaptureKingByBlackKnight (x, y, board) {
	if (board[y + 1]) {
		if (board[y + 1][x + 2] == 12) return true;
		if (board[y + 1][x - 2] == 12) return true;
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 2] == 12) return true;
		if (board[y - 1][x - 2] == 12) return true;
	}

	if (board[y + 2]) {
		if (board[y + 2][x + 1] == 12) return true;
		if (board[y + 2][x - 1] == 12) return true;
	}

	if (board[y - 2]) {
		if (board[y - 2][x + 1] == 12) return true;
		if (board[y - 2][x - 1] == 12) return true;
	}

	return false;
}

function isCaptureKingByBlackBishop (x, y, board) {
	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 12) return true;
		if (board[y + a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 12) return true;
		if (board[y - a][x - a] != 0) break;
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 12) return true;
		if (board[y - a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 12) return true;
		if (board[y + a][x - a] != 0) break;
	}

	return false;
}

function isCaptureKingByBlackQueen (x, y, board) {
	let isCapturing = false;

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 12;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 12;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 12;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 12;
			break;
		}
	}

	if (isCapturing) return true;

	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 12) return true;
		if (board[y + a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 12) return true;
		if (board[y - a][x - a] != 0) break;
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 12) return true;
		if (board[y - a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 12) return true;
		if (board[y + a][x - a] != 0) break;
	}

	return false;
}

function isCaptureKingByWhitePawn (x, y, board) {
	return board[y - 1][x + 1] == 6 || board[y - 1][x - 1] == 6;
}

function isCaptureKingByWhiteRook (x, y, board) {
	let isCapturing = false;

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 6;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 6;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 6;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 6;
			break;
		}
	}

	return isCapturing;
}

function isCaptureKingByWhiteKnight (x, y, board) {
	if (board[y + 1]) {
		if (board[y + 1][x + 2] == 6) return true;
		if (board[y + 1][x - 2] == 6) return true;
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 2] == 6) return true;
		if (board[y - 1][x - 2] == 6) return true;
	}

	if (board[y + 2]) {
		if (board[y + 2][x + 1] == 6) return true;
		if (board[y + 2][x - 1] == 6) return true;
	}

	if (board[y - 2]) {
		if (board[y - 2][x + 1] == 6) return true;
		if (board[y - 2][x - 1] == 6) return true;
	}

	return false;
}

function isCaptureKingByWhiteBishop (x, y, board) {
	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 6) return true;
		if (board[y + a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 6) return true;
		if (board[y - a][x - a] != 0) break;
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 6) return true;
		if (board[y - a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 6) return true;
		if (board[y + a][x - a] != 0) break;
	}

	return false;
}

function isCaptureKingByWhiteQueen (x, y, board) {
	let isCapturing = false;

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 12;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] != 0) {
			isCapturing = board[y][cx] == 6;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 6;
			break;
		}
	}

	if (isCapturing) return true;

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] != 0) {
			isCapturing = board[cy][x] == 6;
			break;
		}
	}

	if (isCapturing) return true;

	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 6) return true;
		if (board[y + a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 6) return true;
		if (board[y - a][x - a] != 0) break;
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 6) return true;
		if (board[y - a][x + a] != 0) break;
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 6) return true;
		if (board[y + a][x - a] != 0) break;
	}

	return false;
}

function getBlackPawnValidMoves (x, y, board) { // En Passant waiting for implement
	if (!board[y + 1]) return [];

	const moves = [];

	if (y == 1 && board[y + 1][x] == 0 && board[y + 2][x] == 0)  moves.push([x, y + 2, isCaptureKingByBlackPawn(x, y + 2, board) ? 2 : 0]);
	if (board[y + 1][x] == 0) moves.push([x, y + 1, board[y + 2] && isCaptureKingByBlackPawn(x, y + 1, board) ? 2 : 0]);
	if (board[y + 1][x + 1] > 6) moves.push([x + 1, y + 1, isCaptureKingByBlackPawn(x + 1, y + 1, board) ? 2 : 1]);
	if (board[y + 1][x - 1] > 6) moves.push([x - 1, y + 1, isCaptureKingByBlackPawn(x - 1, y + 1, board) ? 2 : 1]);

	return moves;
}

function getBlackRookValidMoves (x, y, board) {
	const moves = [];

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] == 0) {
			moves.push([cx, y, isCaptureKingByBlackRook(cx, y, board) ? 2 : 0]);
		} else {
			if (board[y][cx] > 6) moves.push([cx, y, isCaptureKingByBlackRook(cx, y, board) ? 2 : 1]);

			break;
		}
	}

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] == 0) {
			moves.push([cx, y, isCaptureKingByBlackRook(cx, y, board) ? 2 : 0]);
		} else {
			if (board[y][cx] > 6) moves.push([cx, y, isCaptureKingByBlackRook(cx, y, board) ? 2 : 1]);

			break;
		}
	}

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] == 0) {
			moves.push([x, cy, isCaptureKingByBlackRook(x, cy, board) ? 2 : 0]);
		} else {
			if (board[cy][x] > 6) moves.push([x, cy, isCaptureKingByBlackRook(x, cy, board) ? 2 : 1]);

			break;
		}
	}

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] == 0) {
			moves.push([x, cy, isCaptureKingByBlackRook(x, cy, board) ? 2 : 0]);
		} else {
			if (board[cy][x] > 6) moves.push([x, cy, isCaptureKingByBlackRook(x, cy, board) ? 2 : 1]);

			break;
		}
	}

	return moves;
}

function getBlackKnightValidMoves (x, y, board) {
	const moves = [];

	if (board[y + 1]) {
		if (board[y + 1][x + 2] == 0) {
			moves.push([x + 2, y + 1, isCaptureKingByBlackKnight(x + 2, y + 1, board) ? 2 : 0]);
		} else if (board[y + 1][x + 2] > 6) {
			moves.push([x + 2, y + 1, isCaptureKingByBlackKnight(x + 2, y + 1, board) ? 2 : 1]);
		}
	}

	if (board[y + 1]) {
		if (board[y + 1][x - 2] == 0) {
			moves.push([x - 2, y + 1, isCaptureKingByBlackKnight(x - 2, y + 1, board) ? 2 : 0]);
		} else if (board[y + 1][x - 2] > 6) {
			moves.push([x - 2, y + 1, isCaptureKingByBlackKnight(x - 2, y + 1, board) ? 2 : 1]);
		}
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 2] == 0) {
			moves.push([x + 2, y - 1, isCaptureKingByBlackKnight(x + 2, y - 1, board) ? 2 : 0]);
		} else if (board[y - 1][x + 2] > 6) {
			moves.push([x + 2, y - 1, isCaptureKingByBlackKnight(x + 2, y - 1, board) ? 2 : 1]);
		}
	}

	if (board[y - 1]) {
		if (board[y - 1][x - 2] == 0) {
			moves.push([x - 2, y - 1, isCaptureKingByBlackKnight(x - 2, y - 1, board) ? 2 : 0]);
		} else if (board[y - 1][x - 2] > 6) {
			moves.push([x - 2, y - 1, isCaptureKingByBlackKnight(x - 2, y - 1, board) ? 2 : 1]);
		}
	}

	if (board[y + 2]) {
		if (board[y + 2][x + 1] == 0) {
			moves.push([x + 1, y + 2, isCaptureKingByBlackKnight(x + 1, y + 2, board) ? 2 : 0]);
		} else if (board[y + 2][x + 2] > 6) {
			moves.push([x + 1, y + 2, isCaptureKingByBlackKnight(x + 1, y + 2, board) ? 2 : 1]);
		}
	}

	if (board[y + 2]) {
		if (board[y + 2][x - 1] == 0) {
			moves.push([x - 1, y + 2, isCaptureKingByBlackKnight(x - 1, y + 2, board) ? 2 : 0]);
		} else if (board[y + 2][x - 1] > 6) {
			moves.push([x - 1, y + 2, isCaptureKingByBlackKnight(x - 1, y + 2, board) ? 2 : 1]);
		}
	}

	if (board[y - 2]) {
		if (board[y - 2][x + 1] == 0) {
			moves.push([x + 1, y - 2, isCaptureKingByBlackKnight(x + 1, y - 2, board) ? 2 : 0]);
		} else if (board[y - 2][x + 2] > 6) {
			moves.push([x + 1, y - 2, isCaptureKingByBlackKnight(x + 1, y - 2, board) ? 2 : 1]);
		}
	}

	if (board[y - 2]) {
		if (board[y - 2][x - 1] == 0) {
			moves.push([x - 1, y - 2, isCaptureKingByBlackKnight(x - 1, y - 2, board) ? 2 : 0]);
		} else if (board[y - 2][x - 2] > 6) {
			moves.push([x - 1, y - 2, isCaptureKingByBlackKnight(x - 1, y - 2, board) ? 2 : 1]);
		}
	}

	return moves;
}

function getBlackBishopValidMoves (x, y, board) {
	const moves = [];

	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 0) {
			moves.push([x + a, y + a, isCaptureKingByBlackBishop(x + a, y + a, board) ? 2 : 0]);
		} else {
			if (board[y + a][x + a] > 6) moves.push([x + a, y + a, isCaptureKingByBlackBishop(x + a, y + a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 0) {
			moves.push([x - a, y - a, isCaptureKingByBlackBishop(x - a, y - a, board) ? 2 : 0]);
		} else {
			if (board[y - a][x - a] > 6) moves.push([x - a, y - a, isCaptureKingByBlackBishop(x - a, y - a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 0) {
			moves.push([x + a, y - a, isCaptureKingByBlackBishop(x + a, y - a, board) ? 2 : 0]);
		} else {
			if (board[y - a][x + a] > 6) moves.push([x + a, y - a, isCaptureKingByBlackBishop(x + a, y - a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 0) {
			moves.push([x - a, y + a, isCaptureKingByBlackBishop(x - a, y + a, board) ? 2 : 0]);
		} else {
			if (board[y + a][x - a] > 6) moves.push([x - a, y + a, isCaptureKingByBlackBishop(x - a, y + a, board) ? 2 : 1]);
			
			break;
		}
	}

	return moves;
}

function getBlackQueenValidMoves (x, y, board) {
	const moves = [];

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] == 0) {
			moves.push([cx, y, isCaptureKingByBlackQueen(cx, y, board) ? 2 : 0]);
		} else {
			if (board[y][cx] > 6) moves.push([cx, y, isCaptureKingByBlackQueen(cx, y, board) ? 2 : 1]);

			break;
		}
	}

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] == 0) {
			moves.push([cx, y, isCaptureKingByBlackQueen(cx, y, board) ? 2 : 0]);
		} else {
			if (board[y][cx] > 6) moves.push([cx, y, isCaptureKingByBlackQueen(cx, y, board) ? 2 : 1]);

			break;
		}
	}

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] == 0) {
			moves.push([x, cy, isCaptureKingByBlackQueen(x, cy, board) ? 2 : 0]);
		} else {
			if (board[cy][x] > 6) moves.push([x, cy, isCaptureKingByBlackQueen(x, cy, board) ? 2 : 1]);

			break;
		}
	}

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] == 0) {
			moves.push([x, cy, isCaptureKingByBlackQueen(x, cy, board) ? 2 : 0]);
		} else {
			if (board[cy][x] > 6) moves.push([x, cy, isCaptureKingByBlackQueen(x, cy, board) ? 2 : 1]);

			break;
		}
	}

	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 0) {
			moves.push([x + a, y + a, isCaptureKingByBlackQueen(x + a, y + a, board) ? 2 : 0]);
		} else {
			if (board[y + a][x + a] > 6) moves.push([x + a, y + a, isCaptureKingByBlackQueen(x + a, y + a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 0) {
			moves.push([x - a, y - a, isCaptureKingByBlackQueen(x - a, y - a, board) ? 2 : 0]);
		} else {
			if (board[y - a][x - a] > 6) moves.push([x - a, y - a, isCaptureKingByBlackQueen(x - a, y - a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 0) {
			moves.push([x + a, y - a, isCaptureKingByBlackQueen(x + a, y - a, board) ? 2 : 0]);
		} else {
			if (board[y - a][x + a] > 6) moves.push([x + a, y - a, isCaptureKingByBlackQueen(x + a, y - a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 0) {
			moves.push([x - a, y + a, isCaptureKingByBlackQueen(x - a, y + a, board) ? 2 : 0]);
		} else {
			if (board[y + a][x - a] > 6) moves.push([x - a, y + a, isCaptureKingByBlackQueen(x - a, y + a, board) ? 2 : 1]);
			
			break;
		}
	}

	return moves;
}

function getBlackKingValidMoves (x, y, board) { // Castling waiting for implement.
	const moves = [];

	if (board[y + 1]) {
		if (board[y + 1][x + 1] == 0) {
			if (
				!hasWhiteDiagonalPieceOnTile(x + 1, y + 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x + 1, y + 1, board) &&
				!hasWhitePawnOnTile(x + 1, y + 1, board) &&
				!hasWhiteKnightOnTile(x + 1, y + 1, board) &&
				!hasWhiteKingOnTile(x + 1, y + 1, board)
			) moves.push([x + 1, y + 1, 0]);
		}

		if (board[y + 1][x] == 0) {
			if (
				!hasWhiteDiagonalPieceOnTile(x, y + 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x, y + 1, board) &&
				!hasWhitePawnOnTile(x, y + 1, board) &&
				!hasWhiteKnightOnTile(x, y + 1, board) &&
				!hasWhiteKingOnTile(x, y + 1, board)
			) moves.push([x, y + 1, 0]);
		}

		if (board[y + 1][x - 1] == 0) {
			if (
				!hasWhiteDiagonalPieceOnTile(x - 1, y + 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x - 1, y + 1, board) &&
				!hasWhitePawnOnTile(x - 1, y + 1, board) &&
				!hasWhiteKnightOnTile(x - 1, y + 1, board) &&
				!hasWhiteKingOnTile(x - 1, y + 1, board)
			) moves.push([x - 1, y + 1, 0]);
		}
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 1] == 0) {
			if (
				!hasWhiteDiagonalPieceOnTile(x + 1, y - 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x + 1, y - 1, board) &&
				!hasWhitePawnOnTile(x + 1, y - 1, board) &&
				!hasWhiteKnightOnTile(x + 1, y - 1, board) &&
				!hasWhiteKingOnTile(x + 1, y - 1, board)
			) moves.push([x + 1, y - 1, 0]);
		}

		if (board[y - 1][x] == 0) {
			if (
				!hasWhiteDiagonalPieceOnTile(x, y - 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x, y - 1, board) &&
				!hasWhitePawnOnTile(x, y - 1, board) &&
				!hasWhiteKnightOnTile(x, y - 1, board) &&
				!hasWhiteKingOnTile(x, y - 1, board)
			) moves.push([x, y - 1, 0]);
		}

		if (board[y - 1][x - 1] == 0) {
			if (
				!hasWhiteDiagonalPieceOnTile(x - 1, y - 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x - 1, y - 1, board) &&
				!hasWhitePawnOnTile(x - 1, y - 1, board) &&
				!hasWhiteKnightOnTile(x - 1, y - 1, board) &&
				!hasWhiteKingOnTile(x - 1, y - 1, board)
			) moves.push([x - 1, y - 1, 0]);
		}
	}

	if (board[y][x + 1] == 0) {
		if (
			!hasWhiteDiagonalPieceOnTile(x + 1, y, board) &&
			!hasWhitePerpendicularPieceOnTile(x + 1, y, board) &&
			!hasWhitePawnOnTile(x + 1, y, board) &&
			!hasWhiteKnightOnTile(x + 1, y, board) &&
			!hasWhiteKingOnTile(x + 1, y, board)
		) moves.push([x + 1, y, 0]);
	}

	if (board[y][x] == 0) {
		if (
			!hasWhiteDiagonalPieceOnTile(x, y, board) &&
			!hasWhitePerpendicularPieceOnTile(x, y, board) &&
			!hasWhitePawnOnTile(x, y, board) &&
			!hasWhiteKnightOnTile(x, y, board) &&
			!hasWhiteKingOnTile(x, y, board)
		) moves.push([x, y, 0]);
	}

	if (board[y][x - 1] == 0) {
		if (
			!hasWhiteDiagonalPieceOnTile(x - 1, y, board) &&
			!hasWhitePerpendicularPieceOnTile(x - 1, y, board) &&
			!hasWhitePawnOnTile(x - 1, y, board) &&
			!hasWhiteKnightOnTile(x - 1, y, board) &&
			!hasWhiteKingOnTile(x - 1, y, board)
		) moves.push([x - 1, y, 0]);
	}

	if (board[y + 1]) {
		if (board[y + 1][x + 1] > 6) {
			if (
				!hasWhiteDiagonalPieceOnTile(x + 1, y + 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x + 1, y + 1, board) &&
				!hasWhitePawnOnTile(x + 1, y + 1, board) &&
				!hasWhiteKnightOnTile(x + 1, y + 1, board) &&
				!hasWhiteKingOnTile(x + 1, y + 1, board)
			) moves.push([x + 1, y + 1, 1]);
		}

		if (board[y + 1][x] > 6) {
			if (
				!hasWhiteDiagonalPieceOnTile(x, y + 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x, y + 1, board) &&
				!hasWhitePawnOnTile(x, y + 1, board) &&
				!hasWhiteKnightOnTile(x, y + 1, board) &&
				!hasWhiteKingOnTile(x, y + 1, board)
			) moves.push([x, y + 1, 1]);
		}

		if (board[y + 1][x - 1] > 6) {
			if (
				!hasWhiteDiagonalPieceOnTile(x - 1, y + 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x - 1, y + 1, board) &&
				!hasWhitePawnOnTile(x - 1, y + 1, board) &&
				!hasWhiteKnightOnTile(x - 1, y + 1, board) &&
				!hasWhiteKingOnTile(x - 1, y + 1, board)
			) moves.push([x - 1, y + 1, 1]);
		}
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 1] > 6) {
			if (
				!hasWhiteDiagonalPieceOnTile(x + 1, y - 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x + 1, y - 1, board) &&
				!hasWhitePawnOnTile(x + 1, y - 1, board) &&
				!hasWhiteKnightOnTile(x + 1, y - 1, board) &&
				!hasWhiteKingOnTile(x + 1, y - 1, board)
			) moves.push([x + 1, y - 1, 1]);
		}

		if (board[y - 1][x] > 6) {
			if (
				!hasWhiteDiagonalPieceOnTile(x, y - 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x, y - 1, board) &&
				!hasWhitePawnOnTile(x, y - 1, board) &&
				!hasWhiteKnightOnTile(x, y - 1, board) &&
				!hasWhiteKingOnTile(x, y - 1, board)
			) moves.push([x, y - 1, 1]);
		}

		if (board[y - 1][x - 1] > 6) {
			if (
				!hasWhiteDiagonalPieceOnTile(x - 1, y - 1, board) &&
				!hasWhitePerpendicularPieceOnTile(x - 1, y - 1, board) &&
				!hasWhitePawnOnTile(x - 1, y - 1, board) &&
				!hasWhiteKnightOnTile(x - 1, y - 1, board) &&
				!hasWhiteKingOnTile(x - 1, y - 1, board)
			) moves.push([x - 1, y - 1, 1]);
		}
	}

	if (board[y][x + 1] > 6) {
		if (
			!hasWhiteDiagonalPieceOnTile(x + 1, y, board) &&
			!hasWhitePerpendicularPieceOnTile(x + 1, y, board) &&
			!hasWhitePawnOnTile(x + 1, y, board) &&
			!hasWhiteKnightOnTile(x + 1, y, board) &&
			!hasWhiteKingOnTile(x + 1, y, board)
		) moves.push([x + 1, y, 1]);
	}

	if (board[y][x] > 6) {
		if (
			!hasWhiteDiagonalPieceOnTile(x, y, board) &&
			!hasWhitePerpendicularPieceOnTile(x, y, board) &&
			!hasWhitePawnOnTile(x, y, board) &&
			!hasWhiteKnightOnTile(x, y, board) &&
			!hasWhiteKingOnTile(x, y, board)
		) moves.push([x, y, 1]);
	}

	if (board[y][x - 1] > 6) {
		if (
			!hasWhiteDiagonalPieceOnTile(x - 1, y, board) &&
			!hasWhitePerpendicularPieceOnTile(x - 1, y, board) &&
			!hasWhitePawnOnTile(x - 1, y, board) &&
			!hasWhiteKnightOnTile(x - 1, y, board) &&
			!hasWhiteKingOnTile(x - 1, y, board)
		) moves.push([x - 1, y, 1]);
	}

	return moves;
}

function getWhitePawnValidMoves (x, y, board) { // En Passant waiting for implement
	if (!board[y - 1]) return [];

	const moves = [];

	if (y == 6 && board[y - 1][x] == 0 && board[y - 2][x] == 0)  moves.push([x, y - 2, isCaptureKingByWhitePawn(x, y - 2, board) ? 2 : 0]);
	if (board[y - 1][x] == 0) moves.push([x, y - 1, board[y - 2] && isCaptureKingByWhitePawn(x, y - 1, board) ? 2 : 0]);
	if (board[y - 1][x + 1] <= 6 && board[y - 1][x + 1] != 0) moves.push([x + 1, y - 1, isCaptureKingByWhitePawn(x + 1, y - 1, board) ? 2 : 1]);
	if (board[y - 1][x - 1] <= 6 && board[y - 1][x + 1] != 0) moves.push([x - 1, y - 1, isCaptureKingByWhitePawn(x - 1, y - 1, board) ? 2 : 1]);

	return moves;
}

function getWhiteRookValidMoves (x, y, board) {
	const moves = [];

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] == 0) {
			moves.push([cx, y, isCaptureKingByWhiteRook(cx, y, board) ? 2 : 0]);
		} else {
			if (board[y][cx] <= 6) moves.push([cx, y, isCaptureKingByWhiteRook(cx, y, board) ? 2 : 1]);

			break;
		}
	}

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] == 0) {
			moves.push([cx, y, isCaptureKingByWhiteRook(cx, y, board) ? 2 : 0]);
		} else {
			if (board[y][cx]  <= 6) moves.push([cx, y, isCaptureKingByWhiteRook(cx, y, board) ? 2 : 1]);

			break;
		}
	}

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] == 0) {
			moves.push([x, cy, isCaptureKingByWhiteRook(x, cy, board) ? 2 : 0]);
		} else {
			if (board[cy][x] <= 6) moves.push([x, cy, isCaptureKingByWhiteRook(x, cy, board) ? 2 : 1]);

			break;
		}
	}

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] == 0) {
			moves.push([x, cy, isCaptureKingByWhiteRook(x, cy, board) ? 2 : 0]);
		} else {
			if (board[cy][x] <= 6) moves.push([x, cy, isCaptureKingByWhiteRook(x, cy, board) ? 2 : 1]);

			break;
		}
	}

	return moves;
}

function getWhiteKnightValidMoves (x, y, board) {
	const moves = [];

	if (board[y + 1]) {
		if (board[y + 1][x + 2] == 0) {
			moves.push([x + 2, y + 1, isCaptureKingByWhiteKnight(x + 2, y + 1, board) ? 2 : 0]);
		} else if (board[y + 1][x + 2] <= 6) {
			moves.push([x + 2, y + 1, isCaptureKingByWhiteKnight(x + 2, y + 1, board) ? 2 : 1]);
		}
	}

	if (board[y + 1]) {
		if (board[y + 1][x - 2] == 0) {
			moves.push([x - 2, y + 1, isCaptureKingByWhiteKnight(x - 2, y + 1, board) ? 2 : 0]);
		} else if (board[y + 1][x - 2] <= 6) {
			moves.push([x - 2, y + 1, isCaptureKingByWhiteKnight(x - 2, y + 1, board) ? 2 : 1]);
		}
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 2] == 0) {
			moves.push([x + 2, y - 1, isCaptureKingByWhiteKnight(x + 2, y - 1, board) ? 2 : 0]);
		} else if (board[y - 1][x + 2] <= 6) {
			moves.push([x + 2, y - 1, isCaptureKingByWhiteKnight(x + 2, y - 1, board) ? 2 : 1]);
		}
	}

	if (board[y - 1]) {
		if (board[y - 1][x - 2] == 0) {
			moves.push([x - 2, y - 1, isCaptureKingByWhiteKnight(x - 2, y - 1, board) ? 2 : 0]);
		} else if (board[y - 1][x - 2] <= 6) {
			moves.push([x - 2, y - 1, isCaptureKingByWhiteKnight(x - 2, y - 1, board) ? 2 : 1]);
		}
	}

	if (board[y + 2]) {
		if (board[y + 2][x + 1] == 0) {
			moves.push([x + 1, y + 2, isCaptureKingByWhiteKnight(x + 1, y + 2, board) ? 2 : 0]);
		} else if (board[y + 2][x + 2] <= 6) {
			moves.push([x + 1, y + 2, isCaptureKingByWhiteKnight(x + 1, y + 2, board) ? 2 : 1]);
		}
	}

	if (board[y + 2]) {
		if (board[y + 2][x - 1] == 0) {
			moves.push([x - 1, y + 2, isCaptureKingByWhiteKnight(x - 1, y + 2, board) ? 2 : 0]);
		} else if (board[y + 2][x - 1] <= 6) {
			moves.push([x - 1, y + 2, isCaptureKingByWhiteKnight(x - 1, y + 2, board) ? 2 : 1]);
		}
	}

	if (board[y - 2]) {
		if (board[y - 2][x + 1] == 0) {
			moves.push([x + 1, y - 2, isCaptureKingByWhiteKnight(x + 1, y - 2, board) ? 2 : 0]);
		} else if (board[y - 2][x + 2] <= 6) {
			moves.push([x + 1, y - 2, isCaptureKingByWhiteKnight(x + 1, y - 2, board) ? 2 : 1]);
		}
	}

	if (board[y - 2]) {
		if (board[y - 2][x - 1] == 0) {
			moves.push([x - 1, y - 2, isCaptureKingByWhiteKnight(x - 1, y - 2, board) ? 2 : 0]);
		} else if (board[y - 2][x - 2] <= 6) {
			moves.push([x - 1, y - 2, isCaptureKingByWhiteKnight(x - 1, y - 2, board) ? 2 : 1]);
		}
	}

	return moves;
}

function getWhiteBishopValidMoves (x, y, board) {
	const moves = [];

	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 0) {
			moves.push([x + a, y + a, isCaptureKingByWhiteBishop(x + a, y + a, board) ? 2 : 0]);
		} else {
			if (board[y + a][x + a] <= 6) moves.push([x + a, y + a, isCaptureKingByWhiteBishop(x + a, y + a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 0) {
			moves.push([x - a, y - a, isCaptureKingByWhiteBishop(x - a, y - a, board) ? 2 : 0]);
		} else {
			if (board[y - a][x - a] <= 6) moves.push([x - a, y - a, isCaptureKingByWhiteBishop(x - a, y - a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 0) {
			moves.push([x + a, y - a, isCaptureKingByWhiteBishop(x + a, y - a, board) ? 2 : 0]);
		} else {
			if (board[y - a][x + a] <= 6) moves.push([x + a, y - a, isCaptureKingByWhiteBishop(x + a, y - a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 0) {
			moves.push([x - a, y + a, isCaptureKingByWhiteBishop(x - a, y + a, board) ? 2 : 0]);
		} else {
			if (board[y + a][x - a] <= 6) moves.push([x - a, y + a, isCaptureKingByWhiteBishop(x - a, y + a, board) ? 2 : 1]);
			
			break;
		}
	}

	return moves;
}

function getWhiteQueenValidMoves (x, y, board) {
	const moves = [];

	for (let cx = x + 1; cx < 8; cx++) {
		if (board[y][cx] == 0) {
			moves.push([cx, y, isCaptureKingByWhiteQueen(cx, y, board) ? 2 : 0]);
		} else {
			if (board[y][cx] <= 6) moves.push([cx, y, isCaptureKingByWhiteQueen(cx, y, board) ? 2 : 1]);

			break;
		}
	}

	for (let cx = x - 1; cx >= 0; cx--) {
		if (board[y][cx] == 0) {
			moves.push([cx, y, isCaptureKingByWhiteQueen(cx, y, board) ? 2 : 0]);
		} else {
			if (board[y][cx] <= 6) moves.push([cx, y, isCaptureKingByWhiteQueen(cx, y, board) ? 2 : 1]);

			break;
		}
	}

	for (let cy = y + 1; cy < 8; cy++) {
		if (board[cy][x] == 0) {
			moves.push([x, cy, isCaptureKingByWhiteQueen(x, cy, board) ? 2 : 0]);
		} else {
			if (board[cy][x] <= 6) moves.push([x, cy, isCaptureKingByWhiteQueen(x, cy, board) ? 2 : 1]);

			break;
		}
	}

	for (let cy = y - 1; cy >= 0; cy--) {
		if (board[cy][x] == 0) {
			moves.push([x, cy, isCaptureKingByWhiteQueen(x, cy, board) ? 2 : 0]);
		} else {
			if (board[cy][x] <= 6) moves.push([x, cy, isCaptureKingByWhiteQueen(x, cy, board) ? 2 : 1]);

			break;
		}
	}

	for (let a = 1; a < Math.min(8 - x, 8 - y); a++) {
		if (board[y + a][x + a] == 0) {
			moves.push([x + a, y + a, isCaptureKingByWhiteQueen(x + a, y + a, board) ? 2 : 0]);
		} else {
			if (board[y + a][x + a] <= 6) moves.push([x + a, y + a, isCaptureKingByWhiteQueen(x + a, y + a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(x + 1, y + 1); a++) {
		if (board[y - a][x - a] == 0) {
			moves.push([x - a, y - a, isCaptureKingByWhiteQueen(x - a, y - a, board) ? 2 : 0]);
		} else {
			if (board[y - a][x - a] <= 6) moves.push([x - a, y - a, isCaptureKingByWhiteQueen(x - a, y - a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(8 - x, y + 1); a++) {
		if (board[y - a][x + a] == 0) {
			moves.push([x + a, y - a, isCaptureKingByWhiteQueen(x + a, y - a, board) ? 2 : 0]);
		} else {
			if (board[y - a][x + a] <= 6) moves.push([x + a, y - a, isCaptureKingByWhiteQueen(x + a, y - a, board) ? 2 : 1]);
			
			break;
		}
	}

	for (let a = 1; a < Math.min(x + 1, 8 - y); a++) {
		if (board[y + a][x - a] == 0) {
			moves.push([x - a, y + a, isCaptureKingByWhiteQueen(x - a, y + a, board) ? 2 : 0]);
		} else {
			if (board[y + a][x - a] <= 6) moves.push([x - a, y + a, isCaptureKingByWhiteQueen(x - a, y + a, board) ? 2 : 1]);
			
			break;
		}
	}

	return moves;
}

function getWhiteKingValidMoves (x, y, board) { // Castling waiting for implement.
	const moves = [];

	if (board[y + 1]) {
		if (board[y + 1][x + 1] == 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x + 1, y + 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x + 1, y + 1, board) &&
				!hasBlackPawnOnTile(x + 1, y + 1, board) &&
				!hasBlackKnightOnTile(x + 1, y + 1, board) &&
				!hasBlackKingOnTile(x + 1, y + 1, board)
			) moves.push([x + 1, y + 1, 0]);
		}

		if (board[y + 1][x] == 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x, y + 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x, y + 1, board) &&
				!hasBlackPawnOnTile(x, y + 1, board) &&
				!hasBlackKnightOnTile(x, y + 1, board) &&
				!hasBlackKingOnTile(x, y + 1, board)
			) moves.push([x, y + 1, 0]);
		}

		if (board[y + 1][x - 1] == 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x - 1, y + 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x - 1, y + 1, board) &&
				!hasBlackPawnOnTile(x - 1, y + 1, board) &&
				!hasBlackKnightOnTile(x - 1, y + 1, board) &&
				!hasBlackKingOnTile(x - 1, y + 1, board)
			) moves.push([x - 1, y + 1, 0]);
		}
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 1] == 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x + 1, y - 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x + 1, y - 1, board) &&
				!hasBlackPawnOnTile(x + 1, y - 1, board) &&
				!hasBlackKnightOnTile(x + 1, y - 1, board) &&
				!hasBlackKingOnTile(x + 1, y - 1, board)
			) moves.push([x + 1, y - 1, 0]);
		}

		if (board[y - 1][x] == 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x, y - 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x, y - 1, board) &&
				!hasBlackPawnOnTile(x, y - 1, board) &&
				!hasBlackKnightOnTile(x, y - 1, board) &&
				!hasBlackKingOnTile(x, y - 1, board)
			) moves.push([x, y - 1, 0]);
		}

		if (board[y - 1][x - 1] == 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x - 1, y - 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x - 1, y - 1, board) &&
				!hasBlackPawnOnTile(x - 1, y - 1, board) &&
				!hasBlackKnightOnTile(x - 1, y - 1, board) &&
				!hasBlackKingOnTile(x - 1, y - 1, board)
			) moves.push([x - 1, y - 1, 0]);
		}
	}

	if (board[y][x + 1] == 0) {
		if (
			!hasBlackDiagonalPieceOnTile(x + 1, y, board) &&
			!hasBlackPerpendicularPieceOnTile(x + 1, y, board) &&
			!hasBlackPawnOnTile(x + 1, y, board) &&
			!hasBlackKnightOnTile(x + 1, y, board) &&
			!hasBlackKingOnTile(x + 1, y, board)
		) moves.push([x + 1, y, 0]);
	}

	if (board[y][x] == 0) {
		if (
			!hasBlackDiagonalPieceOnTile(x, y, board) &&
			!hasBlackPerpendicularPieceOnTile(x, y, board) &&
			!hasBlackPawnOnTile(x, y, board) &&
			!hasBlackKnightOnTile(x, y, board) &&
			!hasBlackKingOnTile(x, y, board)
		) moves.push([x, y, 0]);
	}

	if (board[y][x - 1] == 0) {
		if (
			!hasBlackDiagonalPieceOnTile(x - 1, y, board) &&
			!hasBlackPerpendicularPieceOnTile(x - 1, y, board) &&
			!hasBlackPawnOnTile(x - 1, y, board) &&
			!hasBlackKnightOnTile(x - 1, y, board) &&
			!hasBlackKingOnTile(x - 1, y, board)
		) moves.push([x - 1, y, 0]);
	}
// ---
	if (board[y + 1]) {
		if (board[y + 1][x + 1] <= 6 && board[y + 1][x + 1] != 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x + 1, y + 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x + 1, y + 1, board) &&
				!hasBlackPawnOnTile(x + 1, y + 1, board) &&
				!hasBlackKnightOnTile(x + 1, y + 1, board) &&
				!hasBlackKingOnTile(x + 1, y + 1, board)
			) moves.push([x + 1, y + 1, 1]);
		}

		if (board[y + 1][x] <= 6 && board[y + 1][x] != 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x, y + 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x, y + 1, board) &&
				!hasBlackPawnOnTile(x, y + 1, board) &&
				!hasBlackKnightOnTile(x, y + 1, board) &&
				!hasBlackKingOnTile(x, y + 1, board)
			) moves.push([x, y + 1, 1]);
		}

		if (board[y + 1][x - 1] <= 6 && board[y + 1][x - 1] != 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x - 1, y + 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x - 1, y + 1, board) &&
				!hasBlackPawnOnTile(x - 1, y + 1, board) &&
				!hasBlackKnightOnTile(x - 1, y + 1, board) &&
				!hasBlackKingOnTile(x - 1, y + 1, board)
			) moves.push([x - 1, y + 1, 1]);
		}
	}

	if (board[y - 1]) {
		if (board[y - 1][x + 1] <= 6 && board[y - 1][x + 1] != 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x + 1, y - 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x + 1, y - 1, board) &&
				!hasBlackPawnOnTile(x + 1, y - 1, board) &&
				!hasBlackKnightOnTile(x + 1, y - 1, board) &&
				!hasBlackKingOnTile(x + 1, y - 1, board)
			) moves.push([x + 1, y - 1, 1]);
		}

		if (board[y - 1][x] <= 6 && board[y - 1][x] != 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x, y - 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x, y - 1, board) &&
				!hasBlackPawnOnTile(x, y - 1, board) &&
				!hasBlackKnightOnTile(x, y - 1, board) &&
				!hasBlackKingOnTile(x, y - 1, board)
			) moves.push([x, y - 1, 1]);
		}

		if (board[y - 1][x - 1] <= 6 && board[y - 1][x - 1] != 0) {
			if (
				!hasBlackDiagonalPieceOnTile(x - 1, y - 1, board) &&
				!hasBlackPerpendicularPieceOnTile(x - 1, y - 1, board) &&
				!hasBlackPawnOnTile(x - 1, y - 1, board) &&
				!hasBlackKnightOnTile(x - 1, y - 1, board) &&
				!hasBlackKingOnTile(x - 1, y - 1, board)
			) moves.push([x - 1, y - 1, 1]);
		}
	}

	if (board[y][x + 1] <= 6 && board[y][x + 1] != 0) {
		if (
			!hasBlackDiagonalPieceOnTile(x + 1, y, board) &&
			!hasBlackPerpendicularPieceOnTile(x + 1, y, board) &&
			!hasBlackPawnOnTile(x + 1, y, board) &&
			!hasBlackKnightOnTile(x + 1, y, board) &&
			!hasBlackKingOnTile(x + 1, y, board)
		) moves.push([x + 1, y, 1]);
	}

	if (board[y][x] <= 6 && board[y][x] != 0) {
		if (
			!hasBlackDiagonalPieceOnTile(x, y, board) &&
			!hasBlackPerpendicularPieceOnTile(x, y, board) &&
			!hasBlackPawnOnTile(x, y, board) &&
			!hasBlackKnightOnTile(x, y, board) &&
			!hasBlackKingOnTile(x, y, board)
		) moves.push([x, y, 1]);
	}

	if (board[y][x - 1] <= 6 && board[y][x - 1] != 0) {
		if (
			!hasBlackDiagonalPieceOnTile(x - 1, y, board) &&
			!hasBlackPerpendicularPieceOnTile(x - 1, y, board) &&
			!hasBlackPawnOnTile(x - 1, y, board) &&
			!hasBlackKnightOnTile(x - 1, y, board) &&
			!hasBlackKingOnTile(x - 1, y, board)
		) moves.push([x - 1, y, 1]);
	}

	return moves;
}

function getAllValidMoves (x, y, value, board) { // return 2D array. each 1D array has 3 ints. [x, y, 0|1|2(0 - move, 1 - capture, 2 - check)]
	if (value == 1) return getBlackPawnValidMoves(x, y, board);
	if (value == 2) return getBlackRookValidMoves(x, y, board);
	if (value == 3) return getBlackKnightValidMoves(x, y, board);
	if (value == 4) return getBlackBishopValidMoves(x, y, board);
	if (value == 5) return getBlackQueenValidMoves(x, y, board);
	if (value == 6) return getBlackKingValidMoves(x, y, board);
	if (value == 7) return getWhitePawnValidMoves(x, y, board);
	if (value == 8) return getWhiteRookValidMoves(x, y, board);
	if (value == 9) return getWhiteKnightValidMoves(x, y, board);
	if (value == 10) return getWhiteBishopValidMoves(x, y, board);
	if (value == 11) return getWhiteQueenValidMoves(x, y, board);
	if (value == 12) return getWhiteKingValidMoves(x, y, board);

	return [];
}

export {
	classesMap,
	defaultBoard,
	getAllValidMoves
};
