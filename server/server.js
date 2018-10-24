const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const { Rooms } = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
const rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('new user connected');
  socket.emit('loadRooms', rooms.getRooms());

  socket.on('join', (params, callback) => {
    const roomSelect = params.room_select;
    const roomInput = params.room_input;

    if (isRealString(roomSelect) && isRealString(roomInput)) {
      return callback('Either select a room or create one');
    }

    const room = roomSelect || roomInput;

    if (!isRealString(params.name) || !isRealString(room)) {
      return callback('Name and room name are required');
    }

    socket.join(room);
    users.removeUser(socket.id);
    // remove user from previous rooms before adding user to a new room
    users.addUser(socket.id, params.name, room);

    if (!rooms.getRooms().includes(room)) {
      rooms.addRoom(room);
    }

    io.to(room).emit('updateUserList', users.getUserList(room));
    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app!')
    );

    socket.broadcast
      .to(room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined`)
      );
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        'newMessage',
        generateMessage(user.name, message.text)
      );
    }

    callback();
  });

  socket.on('createLocationMessage', coords => {
    const user = users.getUser(socket.id);
    io.to(user.room).emit(
      'newLocationMessage',
      generateLocationMessage(user.name, coords.latitude, coords.longitude)
    );
  });

  socket.on('disconnect', () => {
    const removedUser = users.removeUser(socket.id);

    if (removedUser) {
      io.to(removedUser.room).emit(
        'updateUserList',
        users.getUserList(removedUser.room)
      );
      io.to(removedUser.room).emit(
        'newMessage',
        generateMessage('Admin', `${removedUser.name} has left the room`)
      );
    }
  });
});

server.listen(port, () => {
  console.log('Server running on port ' + port);
});
