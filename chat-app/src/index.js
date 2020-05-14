const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users');

const { generateMessage, generateUrl } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

console.log(publicDirectoryPath);

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket
      .to(user.room) // only to that room
      .emit('message', generateMessage('Admin', 'Welcome!')); // only curren user
    socket.broadcast
      .to(user.room) // only to that room
      .emit(
        'message',
        generateMessage('Admin', `${user.username} has joined!`)
      ); // all users but current with broadcast

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    io.to(user.room).emit('message', generateMessage(user.username, message)); // all users in the room
    callback();
  });

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      'locationMessage',
      generateUrl(
        user.username,
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );
    callback();
  });

  // Built-in event for user disconnected
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage('Admin', `${user.username} has left`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
