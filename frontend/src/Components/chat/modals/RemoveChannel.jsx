import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { toast } from 'react-toastify';
import { removeChan } from '../../../API/chatAPI';
import { changeCurrent } from '../../../store/channelsSlice';
import { closeModal } from '../../../store/modalSlice';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const channelToRemoveId = useSelector((state) => state.modal.extra.channelId);
  const { t } = useTranslation();

  const deleteChannel = async (e) => {
    e.preventDefault();
    try {
      await removeChan({ id: channelToRemoveId });
      dispatch(closeModal());
      dispatch(changeCurrent(1));
      toast.success(t('notifications.removeChannel'));
    } catch (error) {
      toast.error(t('notifications.loadingError'));
      console.log(error);
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.areYouSure')}</p>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="me-2"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" type="button" onClick={deleteChannel}>{t('modals.deleteBtn')}</Button>
        </Modal.Footer>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
