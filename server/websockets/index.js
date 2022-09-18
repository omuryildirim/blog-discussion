const WebSocket = require('ws');

module.exports = async (expressServer) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
        path: '/websockets'
    });

    expressServer.on('upgrade', (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
            websocketServer.emit('connection', websocket, request);
        });
    });

    websocketServer.on(
        'connection',
        (websocketConnection) => {
            websocketConnection.on('message', (message) => {
                const parsedMessage = JSON.parse(message);

                websocketServer.clients.forEach((client) => {
                    // Only send message to other open connections
                    if (client !== websocketConnection && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(parsedMessage));
                    }
                });
            });
        }
    );

    return websocketServer;
};
