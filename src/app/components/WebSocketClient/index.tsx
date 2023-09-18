import React, {useEffect} from 'react';


type WebSocketClientProps = {
    onDataReceived: (data: object) => void;
}

const WebSocketClient: React.FC<WebSocketClientProps> = ({onDataReceived}) => {
    useEffect(() => {
        const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_API_URL || '');
        socket.onmessage = function (event) {
            onDataReceived(event.data);
        };
        socket.onerror = function (error) {
            console.log(error);
        };

        return socket.close();
    }, [onDataReceived]);

    return null;
};

export default WebSocketClient;