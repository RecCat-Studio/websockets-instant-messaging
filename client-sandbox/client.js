import WebSocket from 'ws';
import { jsonToString, stringToJson } from './lib/utils.js';

const connectToWebSocketServer = () => {
    const domain = process.env.DOMAIN;
    const port = process.env.PORT; 
    const ws = new WebSocket(`ws://${domain}:${port}`);

    ws.on('open', () => {
        console.log('Connected to WebSocket server.');

        const clientMessage = {
            username: 'Client',
            body: 'hello server',
            time: new Date(),
        };
        const clientMessageToString = jsonToString(clientMessage);

        ws.send(Buffer.from(clientMessageToString));
    });

    ws.on('message', (data) => {
        const messageToJSON = stringToJson(data.toString());
        console.log(messageToJSON);
    });

    ws.on('close', () => {
        console.log('Connexion have been closed !'); 
        console.log('Reconexion attempt in 5 seconds');
        setTimeout(() => {
            connectToWebSocketServer();
        }, 5000);
	});

    ws.on('error', (err) => {
        console.log('error: %s', err);
        ws.close();
    });

};

connectToWebSocketServer();