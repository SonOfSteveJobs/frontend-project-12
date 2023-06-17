import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {removeChan} from '../../../API/chatAPI';
import {closeModal} from '../../../store/modalSlice';
import {useTranslation} from 'react-i18next';

const RemoveChannel = () => {
    const dispatch = useDispatch();
    const channelToRemoveId = useSelector((state) => state.modal.extra.channelId);
    const { t } = useTranslation();

    const deleteChannel = async (e) => {
        e.preventDefault();
        await removeChan({id: channelToRemoveId});
        dispatch(closeModal());
    };
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{t('modals.delete')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">{t('modals.areYouSure')}</p>
                <Modal.Footer>
                    <Button variant="secondary" className="me-2" type="button" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
                    <Button variant="danger" type="button" onClick={deleteChannel}>{t('modals.deleteBtn')}</Button>
                </Modal.Footer>
            </Modal.Body>
        </>
    );
};

export default RemoveChannel;
