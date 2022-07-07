import { WebSocketContext } from '../providers/WebSocketProvider';
import { useContext } from 'react';

export const useWebSocket = () => {
    const webSocket = useContext(WebSocketContext);

    return webSocket;
};