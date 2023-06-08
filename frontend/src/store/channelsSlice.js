import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import getAuthHeader from '../API/getAuthHeader';
import getChatData from '../API/getChatData';

const initialState = {
    channels: [],
    currentChannelId: null
}

export const getChannelsInfo = createAsyncThunk(
    'getChannelsInfo',
    async () => {
        const {channels, currentChannelId} = await getChatData();
        console.log('channels', channels)
        return {channels, currentChannelId};
    }
)


export const channelsSlice = createSlice({
    name: 'channelsSlice',
    initialState,
    reducers: {
        changeCurrent: (state, action) => {
            state.currentChannelId = state.channels.find(({id}) => id === action.payload) || initialState.currentChannelId;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChannelsInfo.fulfilled, (state, action) => {
            console.log('action', action)
            state.channels = action.payload.channels;
            state.currentChannelId = action.payload.currentChannelId;
        })
        .addCase(getChannelsInfo.rejected, (state, action) => {
            console.log("getChannelsInfo failed", action.error);
        })
    }
})

export const { changeCurrent } = channelsSlice.actions

export default channelsSlice.reducer