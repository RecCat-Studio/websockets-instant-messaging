import { useEffect, useState, createContext } from "react";

const domain = process.env.REACT_APP_DOMAIN;
const port = process.env.REACT_APP_PORT;
const time = process.env.REACT_APP_SOCKET_RECONNECTION_TIMEOUT;
const socketUrl = `ws://${domain}:${port}`;

const webSocket = new WebSocket(socketUrl);

export const WebSocketContext = createContext(webSocket);

export const WebSocketProvider = (props) => {
    const [ws, setWs] = useState(webSocket);

    useEffect(() => {
        const onClose = () => {
            console.log('Connexion have been closed !');
            console.log('Reconexion attempt in 5 seconds');
            setTimeout(() => {
				setWs(new WebSocket(socketUrl));
			}, time);
        };

        ws.addEventListener('open', () => {
            console.log('Connected to WebSocket server.');
        })

        ws.addEventListener('error', (err) => {
            console.error(err);
        })

        ws.addEventListener('close', onClose);

        return () => {
            ws.removeEventListener('close', onClose);
        };
    }, [ws, setWs]);

    return (
        <WebSocketContext.Provider value={ws}>
            {props.children}
        </WebSocketContext.Provider>
    );
};

