import {createSlice} from '@reduxjs/toolkit';
import {getChatInfo} from './channelsSlice';


const initialState = {
    messages: [],
}

export const messagesSlice = createSlice({
    name: 'messagesSlice',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            console.log('ACTION', action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChatInfo.fulfilled, (state, action) => {
            state.messages = action.payload.messages;
        })
    }
})

export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer