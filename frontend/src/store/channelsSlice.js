import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import getChatData from '../API/getChatData';

const initialState = {
    channels: [],
    currentChannelId: 1
}

export const getChatInfo = createAsyncThunk(
    'getChatInfo',
    async () => {
        const {channels, currentChannelId, messages} = await getChatData();
        return {channels, currentChannelId, messages};
    }
)


export const channelsSlice = createSlice({
    name: 'channelsSlice',
    initialState,
    reducers: {
        changeCurrent: (state, action) => {
            state.currentChannelId = action.payload || initialState.currentChannelId;
        },
        addChannel: (state, action) => {
            console.log(action);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChatInfo.fulfilled, (state, action) => {
            state.channels = action.payload.channels;
            state.currentChannelId = action.payload.currentChannelId;
        })
        .addCase(getChatInfo.pending, (state, action) =>{
            console.log('status:', action.meta.requestStatus)
        })
        .addCase(getChatInfo.rejected, (state, action) => {
            console.log("getChannelsInfo failed", action.error);
        })
    }
})

export const { changeCurrent, addChannel } = channelsSlice.actions

export default channelsSlice.reducer