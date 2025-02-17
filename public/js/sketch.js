import ChessBoard from './chess-board.js';

const chessBoard = new ChessBoard(
	document.getElementById('board'),
	document.getElementById('side-panel-1'),
	document.getElementById('side-panel-2')
);

const host = window.location.host;
const ws = new WebSocket(`${window.location.protocol == 'http:' ? 'ws' : 'wss'}://${host}`);
const WS_MG_CODES = {
	WAIT: 2345,
	ROOM_ASSIGNED: 2346,
	ROOM_CLOSED: 2347,
	START: 2348,
	CLICK: 2349
};

chessBoard.action = {
	click: (coords) => {
		ws.send(JSON.stringify({
			coords,
			code: WS_MG_CODES.CLICK
		}));
	}
};

ws.addEventListener("open", (event) => {
	console.log("Hello Server!");
});

ws.addEventListener("message", (event) => {
	const data = JSON.parse(event.data);
	const code = data.code;

	if (code == WS_MG_CODES.WAIT) {
		console.log(`You have connected. Please wait. Your id is ${data.id}`);
		chessBoard.init();
		return;
	}

	if (code == WS_MG_CODES.ROOM_ASSIGNED) {
		console.log(`Room assigned with ${data.id}. Get ready.`);
		
		chessBoard.hasRoom = true;
		return;
	}

	if (code == WS_MG_CODES.ROOM_CLOSED) {
		console.log(`Room Closed.`);

		chessBoard.hasRoom = false;
		return;
	}

	if (code == WS_MG_CODES.START) {
		console.log(`Room started. ${data.message}`);
		chessBoard.hasRoom = true;

		if (data.player == 0) {
			chessBoard.player = 0;
			chessBoard.playerChance = false;

			chessBoard.flip();
		} else {
			chessBoard.player = 1;
			chessBoard.playerChance = true;
		}

		return;
	}

	if (code == WS_MG_CODES.CLICK) {
		const coords = data.coords;

		chessBoard.clickOnTile(chessBoard.tiles[coords[1]][coords[0]], chessBoard.player == 0 ? 1 : 0);
	}
});
