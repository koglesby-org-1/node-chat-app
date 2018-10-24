const socket = io();

socket.on('connect', () => {
  console.log('Index connected');

  socket.on('loadRooms', function(rooms) {
    console.log('rooms: ', rooms);
    rooms.forEach(function(room) {
      $('#room-select').append(
        $('<option></option>')
          .text(room.name)
          .attr('value', `${room.name}`)
      );
    });
  });
});
