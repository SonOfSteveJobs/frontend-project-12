import { io } from 'socket.io-client';

const socket = io();
socket.on('message', (message) => {
    console.log(message);
});
socket.emit('message','Hello, my name is Client');