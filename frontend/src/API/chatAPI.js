import { io } from 'socket.io-client';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../store/channelsSlice';
import { addMessage } from '../store/messagesSlice';
import store from '../store/store';

const socket = io();
const { dispatch } = store;

socket.on('newMessage', (payload) => {
  dispatch(addMessage(payload));
});
socket.on('newChannel', (payload) => {
  dispatch(addChannel(payload));
});
socket.on('removeChannel', (payload) => {
  dispatch(removeChannel(payload.id));
});
socket.on('renameChannel', (payload) => {
  dispatch(renameChannel(payload));
});

export const sendMessage = (message) => {
  socket.emit('newMessage', message, (response) => {
    if (response.error) {
      console.log('MESSAGE ERROR', 'ERROR:', response.error);
    } else {
      console.log('MESSAGE HAS BEEN SENT, response status:', response.status, 'CONNECTED:', socket.connected);
    }
  });
};

export const addChan = (channel) => new Promise((resolve, reject) => {
  socket.emit('newChannel', channel, (response) => {
    if (response.error) {
      console.log('CHANNEL ADD ERROR', 'ERROR:', response.error);
      reject();
    } else {
      console.log('CHANNEL HAS BEEN CREATED, response status:', response.status, 'CONNECTED:', socket.connected);
      resolve(response.data.id);
    }
  });
});

export const removeChan = (channel) => {
  socket.emit('removeChannel', channel, (response) => {
    if (response.error) {
      console.log('CHANNEL REMOVE ERROR', 'ERROR:', response.error);
    } else {
      console.log('CHANNEL HAS BEEN REMOVED, response status:', response.status, 'CONNECTED:', socket.connected);
    }
  });
};

export const renameChan = (channel) => {
  socket.emit('renameChannel', channel, (response) => {
    if (response.error) {
      console.log('CHANNEL CHANGE ERROR', 'ERROR:', response.error);
    } else {
      console.log('CHANNEL HAS BEEN RENAMED, response status:', response.status, 'CONNECTED:', socket.connected);
    }
  });
};
