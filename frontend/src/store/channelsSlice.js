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
  async (authHeader) => {
    const { channels, currentChannelId, messages } = await getChatData(authHeader);
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
    })
      .addCase(getChatInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChatInfo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  changeCurrent, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
