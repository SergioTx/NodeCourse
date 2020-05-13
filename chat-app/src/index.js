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

io.on('connection', (socket) => {
  console.log('New websocket connection');

  socket.emit('message', 'Welcome!'); // only curren user
  socket.broadcast.emit('message', 'A new user has joined!'); // all users but current

  socket.on('sendMessage', (message) => {
    io.emit('message', message); // all users
  });

  // Built-in event for user disconnected
  socket.on('disconnect', () => {
    io.emit('message', 'User has left');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
