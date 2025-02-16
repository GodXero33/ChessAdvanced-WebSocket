const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocket.Server({ server: httpServer });

app.use(express.static(path.join(__dirname, 'public')));

let players = new Set();
let messages = 0;

wsServer.on('connection', (players) => {
	clients.add(socket);
	console.log('New client connected.');

	players.on('message', (data) => {
		const message = JSON.parse(data);
		messages++;
		console.log(messages);

		clients.forEach(client => {
			if (client !== players && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	});

	players.on('close', () => {
		clients.forEach(client => {
			if (client !== players && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({ reset: true }));
			}
		});

		clients.delete(players);
		console.log('Client disconnected.');
	});
});

httpServer.listen(8080, '0.0.0.0', () => {
	console.log('Server running on http://192.168.8.159:8080');
});
