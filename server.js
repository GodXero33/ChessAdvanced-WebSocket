const WS_MG_CODES = {
	WAIT: 2345,
	ROOM_ASSIGNED: 2346,
	ROOM_CLOSED: 2347,
	START: 2348,
	CLICK: 2349
};

const rooms = new Set();
const clients = new Set();
let waitingPlayer = null;
let currentID = 1;

class Room {
	constructor (player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
	}

	start () {
		const startingPlayer = Math.floor(Math.random() * 2);

		if (startingPlayer == 0) {
			this.player1.send({
				code: WS_MG_CODES.START,
				message: "Your turn",
				player: 1
			});
			this.player2.send({
				code: WS_MG_CODES.START,
				message: "Wait other to move",
				player: 0
			});
		} else {
			this.player1.send({
				code: WS_MG_CODES.START,
				message: "Wait other to move",
				player: 0
			});
			this.player2.send({
				code: WS_MG_CODES.START,
				message: "Your turn",
				player: 1
			});
		}
	}

	receive (data, player) {
		if (data.code == WS_MG_CODES.CLICK) {
			const message = {
				code: WS_MG_CODES.CLICK,
				coords: data.coords
			};

			player == this.player1 ? this.player2.send(message) : this.player1.send(message);
		}
	}

	close (player) {
		const message = {
			code: WS_MG_CODES.ROOM_CLOSED
		};

		player == this.player1 ? this.player2.send(message) : this.player1.send(message);
		rooms.delete(this);
	}
}

class Player {
	constructor (client, id, room) {
		this.client = client;
		this.id = id;
		this.room = room;

		this.client.chessPlayer = this;
	}

	send (message) {
		if (this.client.readyState === WebSocket.OPEN) this.client.send(JSON.stringify(message));
	}

	receive (data, player) {
		this.room.receive(data, player);
	}

	close () {
		if (this.room) this.room.close();
	}
}

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocket.Server({ server: httpServer });

app.use(express.static(path.join(__dirname, 'public')));

function playerOnMessage (data, client) {
	if (client.chessPlayer) client.chessPlayer.receive(JSON.parse(data), client.chessPlayer);
}

function playerOnClose (client) {
	console.log("A player has disconnected!");

	if (client.chessPlayer) client.chessPlayer.close();

	clients.delete(client);
}

wsServer.on('connection', (client) => {
	client.on('message', (data) => playerOnMessage(data, client));
	client.on('close', () => playerOnClose(client));
	clients.add(client);

	console.log('New Player has connected.');

	const player = new Player(client, currentID, null);
	currentID++;
	
	client.send(JSON.stringify({
		code: WS_MG_CODES.WAIT,
		id: currentID
	}));

	if (waitingPlayer == null) {
		waitingPlayer = player;
	} else {
		const room = new Room(waitingPlayer, player);
		waitingPlayer.room = room;
		player.room = room;
		waitingPlayer = null;

		room.start();
		rooms.add(room);
	}
});

httpServer.listen(8080, '0.0.0.0', () => {
	console.log('Server running on http://192.168.8.159:8080');
});
