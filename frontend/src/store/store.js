import { configureStore } from '@reduxjs/toolkit'
import channelsInfo from './channelsSlice.js'
import messagesInfo from './messagesSlice';

export const store = configureStore({
    reducer: {
        channelsInfo,
        messagesInfo,
    },
})