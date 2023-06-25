import { useFormik } from 'formik';
import React, {
  useEffect,
  useRef,
} from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { renameChan } from '../../../API/chatAPI';
import { closeModal } from '../../../store/modalSlice';

const validationChannelsSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(20)
    .notOneOf(channels),
});

const RenameChannel = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const refContainer = useRef('');
  const dispatch = useDispatch();
  const channelToRenameId = useSelector((state) => state.modal.extra.channelId);
  const channelToRename = channels.find(({ id }) => id === channelToRenameId);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      refContainer.current.select();
    }, 1);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channelToRename.name,
    },
    validationSchema: validationChannelsSchema(channelsNames),
    onSubmit: async (values) => {
      try {
        await renameChan({ id: channelToRenameId, ...values });
        dispatch(closeModal());
        toast.success(t('notifications.renameChannel'));
      } catch (e) {
        toast.error(t('notifications.loadingError'));
        console.log(e);
      }
    },
  });
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              ref={refContainer}
              name="name"
              id="name"
              required=""
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            <FormLabel htmlFor="name" className="visually-hidden">{t('modals.channelName')}</FormLabel>
            <FormControl.Feedback type="invalid">
              {formik.errors.name}
            </FormControl.Feedback>
            <Modal.Footer>
              <Button
                variant="secondary"
                type="button"
                onClick={() => dispatch(closeModal())}
              >
                {t('modals.cancel')}
              </Button>
              <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('modals.send')}</Button>
            </Modal.Footer>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
