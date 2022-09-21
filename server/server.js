const app = require('./app');
const http = require('http');
const websockets = require('./websockets');

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Listening on ${port}.`);
});

websockets(server);
