const socketio = require('socket.io');

const {
  userJoin,
  userLeave,
  formatMessage,
  getCurrentUser,
  getRoomUsers,
} = require('../utils/chat');

module.exports = (httpServer) => {
  const botName = 'chat bot';
  const io = socketio(httpServer).of('/chat');
  io.on('connection', (socket) => {
    logger.info(`socket connected = ${socket.id}`);

    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      socket.join(user.room);
      socket.emit('message', formatMessage(botName, `Welcome to ${botName}`));
      socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    socket.on('disconnect', () => {
      logger.info(`socket disconnected = ${socket.id}`);
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};