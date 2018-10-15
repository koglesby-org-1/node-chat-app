const socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('createMessage', {
    to: 'alice',
    text: 'hello!!'
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
});
