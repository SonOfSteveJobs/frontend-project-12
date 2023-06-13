import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {closeModal} from '../../../store/modalSlice';
import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel'
import RenameChannel from './RenameChannel'

const modals = {
    addChannel: AddChannel,
    removeChannel: RemoveChannel,
    renameChannel: RenameChannel,
};

const ChatModal = () => {
    const isOpened = useSelector((state) => state.modal.isOpened);
    const type = useSelector((state) => state.modal.type);
    const channels = useSelector((state) => state.channelsInfo.channels);
    const dispatch = useDispatch();

    const closeModalHandler = () => {
        console.log('CLOSED')
        dispatch(closeModal());
    };


    return (
        <Modal show={isOpened} onHide={closeModalHandler} centered>
            <AddChannel
                closeModalHandler={closeModalHandler}
                channels={channels}
            />
        </Modal>
    );
};

export default ChatModal;