import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {removeChan} from '../../../API/chatAPI';
import {closeModal} from '../../../store/modalSlice';

const RemoveChannel = () => {
    const dispatch = useDispatch();
    const channelToRemoveId = useSelector((state) => state.modal.extra.channelId);
    const deleteChannel = async (e) => {
        e.preventDefault();
        await removeChan({id: channelToRemoveId});
        dispatch(closeModal());
    };
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">Уверены?</p>
                <Modal.Footer>
                    <Button variant="secondary" className="me-2" type="button" onClick={() => dispatch(closeModal())}>Отменить</Button>
                    <Button variant="danger" type="button" onClick={deleteChannel}>Удалить</Button>
                </Modal.Footer>
            </Modal.Body>
        </>
    );
};

export default RemoveChannel;
