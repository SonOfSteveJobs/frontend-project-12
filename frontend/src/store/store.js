import { configureStore } from '@reduxjs/toolkit';
import channelsInfo from './channelsSlice.js';
import messagesInfo from './messagesSlice';
import modal from './modalSlice';

const store = configureStore({
  reducer: {
    channelsInfo,
    messagesInfo,
    modal,
  },
});

export default store;
