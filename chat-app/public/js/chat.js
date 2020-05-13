const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');

socket.on('message', (message) => {
  console.log(message);
});

$messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // disable form
  $messageFormButton.setAttribute('disabled', 'disabled');

  const message = event.target.elements.message.value;
  $messageFormInput.value = '';
  $messageFormInput.focus();

  socket.emit('sendMessage', message, (error) => {
    // enable form
    $messageFormButton.removeAttribute('disabled');

    if (error) {
      return console.log(error);
    }
    console.log('Message delivered!');
  });
});

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', { latitude, longitude }, () => {
      $sendLocationButton.removeAttribute('disabled');
      console.log('Location shared!');
    });
  });
});
