/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { name, id } = action.payload;
      state.isOpened = true;
      state.type = name;
      state.extra = { channelId: id };
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
