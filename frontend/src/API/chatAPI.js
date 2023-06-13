import { io } from 'socket.io-client';
import {addMessage} from '../store/messagesSlice';
import {store} from '../store/store';

const socket = io();
const { dispatch } = store;
socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
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