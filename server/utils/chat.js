const moment = require('moment');

const users = [];

module.exports = {
  userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;
  },
  getCurrentUser(id) {
    return users.find(user => user.id === id);
  },
  userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return [];
  },
  getRoomUsers(room) {
    return users.filter(user => user.room === room);
  },
  formatMessage(username, text) {
    return {
      username,
      text,
      time: moment().format('h:mm a'),
    };
  },
};