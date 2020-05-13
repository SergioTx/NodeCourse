const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

console.log(publicDirectoryPath);

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
  console.log('New websocket connection');

  socket.emit('countUpdated', count);

  socket.on('increment', () => {
    count++;
    // socket.emit('countUpdated', count); // only for that connection
    io.emit('countUpdated', count); // for all connected clients
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
