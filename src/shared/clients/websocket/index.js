let client;

const websocket = (onMessageReceive) => {
    client = client || new WebSocket('ws://localhost:3001/websockets');

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

    return (message) => {
        client.send(JSON.stringify(message));
    };
};

export default websocket;
