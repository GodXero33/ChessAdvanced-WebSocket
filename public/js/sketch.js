import ChessBoard from './chess-board.js';

const chessBoard = new ChessBoard(
	document.getElementById('board'),
	document.getElementById('side-panel-1'),
	document.getElementById('side-panel-2')
);

function init () {
	chessBoard.init();
	
	// setTimeout(() => chessBoard.flip(), 500);
}
let t = 0;
window.addEventListener('dblclick', () => {
	if (t == 0) {
		chessBoard.clickOnTile(chessBoard.tiles[7][0], chessBoard.player == 0 ? 1 : 0);
		t = 1;
		return;
	}
	chessBoard.clickOnTile(chessBoard.tiles[5][1], chessBoard.player == 0 ? 1 : 0);
});

init();
