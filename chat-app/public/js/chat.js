const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message delivered!');
  });
});

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', { latitude, longitude }, () => {
      console.log('Location shared!');
    });
  });
});
