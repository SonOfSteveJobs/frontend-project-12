import { configureStore } from '@reduxjs/toolkit'
import channelsInfo from './channelsSlice.js'

export const store = configureStore({
    reducer: {
        channelsInfo,
    },
})