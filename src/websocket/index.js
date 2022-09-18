const client = new WebSocket('ws://localhost:3001/websockets');

export const websocket = (onMessageReceive) => {
    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
        const data = JSON.parse(message.data);
        try {
            onMessageReceive(data);
        } catch (error) {
            console.log(error);
        }
    };

    client.onerror = () => {
        console.log('Connection Error');
    };

    const sendCommentToWebSocket = (comment) => {
        client.send(JSON.stringify({
            event: 'comment:upvote',
            comment
        }));
    };

    return sendCommentToWebSocket;
};
