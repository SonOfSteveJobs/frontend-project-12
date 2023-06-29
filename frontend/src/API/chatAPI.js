import { io } from 'socket.io-client';

const socket = io();

export const sendMessage = (message) => {
  socket.emit('newMessage', message, (response) => {
    if (response.error) {
      console.error('MESSAGE ERROR:', response.error);
    }
  });
};

export const addChan = (channel) => new Promise((resolve, reject) => {
  socket.emit('newChannel', channel, (response) => {
    if (response.error) {
      console.error('CHANNEL ADD ERROR:', response.error);
      reject();
    } else {
      resolve(response.data.id);
    }
  });
});

export const removeChan = (channel) => {
  socket.emit('removeChannel', channel, (response) => {
    if (response.error) {
      console.error('CHANNEL REMOVE ERROR:', response.error);
    }
  });
};

export const renameChan = (channel) => {
  socket.emit('renameChannel', channel, (response) => {
    if (response.error) {
      console.error('CHANNEL CHANGE ERROR:', response.error);
    }
  });
};

const onSocketEvent = (event, payload) => {
  socket.on(event, payload);
};

export default onSocketEvent;
