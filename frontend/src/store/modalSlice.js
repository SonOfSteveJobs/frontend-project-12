import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isOpened: false,
    type: null,
    extra: null,
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpened = true;
            state.type = action.payload;
        },
        closeModal: (state) => {
            state.isOpened = false;
            state.type = null;
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer