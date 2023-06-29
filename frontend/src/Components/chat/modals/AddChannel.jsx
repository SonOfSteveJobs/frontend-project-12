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
import { addChan } from '../../../API/chatAPI';
import { changeCurrent } from '../../../store/channelsSlice';
import { closeModal } from '../../../store/modalSlice';

const AddChannel = () => {
  const refAdd = useRef('');
  const allChannels = useSelector((state) => state.channelsInfo.channels);
  const channelsNames = allChannels.map((channel) => channel.name);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    refAdd.current.focus();
  }, []);

  const validationChannelsSchema = (channels) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('forms.required'))
      .min(3, t('forms.min'))
      .max(20, t('forms.max'))
      .notOneOf(channels, t('forms.unique')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsSchema(channelsNames),
    onSubmit: async (values) => {
      try {
        await addChan(values)
          .then((id) => dispatch(changeCurrent(id)));
        dispatch(closeModal());
        toast.success(t('notifications.channelCreated'));
      } catch (e) {
        toast.error(t('notifications.loadingError'));
        console.log(e);
      }
    },
  });
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              ref={refAdd}
              id="name"
              name="name"
              required=""
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
              autoComplete="off"
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

export default AddChannel;
