const express  = require('express');
const socket   = require('socket.io');

// app
const app = express();
const server = app.listen(3000, function() {
  console.log('listening to requirests on port 3000');
});

app.use(express.static('./public'));

// Socket.io server setup
var io = socket(server);

io.on('connection', function(socket) { // parameter socket is the current socket/connection
  console.log('made socket connection', socket.id);

  socket.on('chat-msg', function(data) {
    io.sockets.emit('chat-msg', data)
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  })
});
