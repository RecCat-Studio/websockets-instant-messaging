import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { jsonToString, stringToJson } from './lib/utils.js';

const port = process.env.PORT;
const server = http.createServer(express);
const wsServer = new WebSocketServer({ server });

wsServer.on('connection', (ws, req) => {	
	const serverMessage = {
		username: 'Server',
		body: 'hello client',
		time: new Date()		
	};
	const serverMessageToString = jsonToString(serverMessage);

	ws.send(Buffer.from(serverMessageToString));

	ws.on('message', (data) => {
		console.log(stringToJson(data.toString()));

		wsServer.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});
});

server.listen(port, function () {
	console.log(`Web Socket Server is listening on port ${port} !`);
});