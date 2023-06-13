import { io } from 'socket.io-client';
import {addMessage} from '../store/messagesSlice';
import {store} from '../store/store';
import {addChannel, changeCurrent} from '../store/channelsSlice';

const socket = io();
const { dispatch } = store;
socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
});
socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload))
    dispatch(changeCurrent(payload.id))
});

export const sendMessage = (message) => {
    socket.timeout(5000).emit('newMessage', message, (err, response) => {
        if (err) {
            console.log('MESSAGE ERROR', 'ERROR:', err);
        } else {
            console.log('MESSAGE HAS BEEN SENT, response status:', response.status, 'CONNECTED:', socket.connected);
        }
    });
}

export const addChan = (channel) => {
    socket.timeout(5000).emit('newChannel', channel, (err, response) => {
        if (err) {
            console.log('CHANNEL ERROR', 'ERROR:', err);
        } else {
            console.log('CHANNEL HAS BEEN CREATED, response status:', response.status, 'CONNECTED:', socket.connected);
        }
    });
}