/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import getChatData from '../API/getChatData';

const initialState = {
  channels: [],
  currentChannelId: 1,
  loading: false,
  error: false,
};

export const getChatInfo = createAsyncThunk(
  'getChatInfo',
  async () => {
    const { channels, currentChannelId, messages } = await getChatData();
    return { channels, currentChannelId, messages };
  },
);

export const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState,
  reducers: {
    changeCurrent: (state, action) => {
      state.currentChannelId = action.payload || initialState.currentChannelId;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channelToRename = state.channels.find((channel) => channel.id === id);
      channelToRename.name = name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatInfo.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
      state.loading = false;
      console.log('fulfilled');
    })
      .addCase(getChatInfo.pending, (state, action) => {
        state.loading = true;
        console.log('status:', action.meta.requestStatus);
      })
      .addCase(getChatInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log('getChannelsInfo failed', action.error);
      });
  },
});

export const {
  changeCurrent, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
