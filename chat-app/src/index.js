const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateUrl } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

console.log(publicDirectoryPath);

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  socket.on('join', ({ username, room }) => {
    socket.join(room);

    socket
      .to(room) // only to that room
      .emit('message', generateMessage('Welcome!')); // only curren user
    socket.broadcast
      .to(room) // only to that room
      .emit('message', generateMessage(`${username} has joined!`)); // all users but current with broadcast
  });

  socket.to('test room').on('sendMessage', (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    io.emit('message', generateMessage(message)); // all users
    callback();
  });

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    io.emit(
      'locationMessage',
      generateUrl(`https://google.com/maps?q=${latitude},${longitude}`)
    );
    callback();
  });

  // Built-in event for user disconnected
  socket.on('disconnect', () => {
    io.emit('message', generateMessage('User has left'));
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
