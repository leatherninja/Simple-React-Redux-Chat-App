const express = require('express');
const {disconnect} = require('process');
const app = express();
const PORT = 4000;
const server = require('http').Server(app);
const io = require('socket.io')(server, {cors: {origin: '*'}});

app.use(express.json());

const room = {
  users: [],
  messages: []
};

app.get('/room', (req, res) => {
  const obj = {
    users: room.users,
    messages: room.messages,
  };
  res.json(obj);
});

app.post('/room', (req, res) => {
  const {userName} = req.body;
  res.send('ok');
});

io.on('connection', (socket) => {
  // Run when client connects
  socket.on('ROOM:JOIN', ({userName, userAvatar}) => {
    socket.join('room');
    room.users.push({
      userId: socket.id, userName: userName, userAvatar: userAvatar
    });
    const users = room.users;
    socket.to('room').broadcast.emit('ROOM:SET_USERS', users);
   
  });

  // Run when client send message
  socket.on('ROOM:NEW_MESSAGE', ({userName, text, avatar}) => {
    const newMessage = {userName, text, id:socket.id, avatar: avatar};
    room.messages.push(newMessage);
    socket.to('room').emit('ROOM:NEW_MESSAGE', newMessage);
  });

  // Run when client disconnect
  socket.on('disconnect', () => {
      room.users.forEach((user, idx) => {
        user.userId === socket.id && room.users.splice(idx, 1);
      });
      socket.broadcast.emit('ROOM:SET_USERS', room.users); 
      console.log(room.users); 
  });
});

// Listening port
server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`Сервер запущен на ${PORT} порту...`);
});
