import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
    Modal, FormGroup, FormControl, FormLabel, Button, Form,
} from 'react-bootstrap';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {addChan} from '../../../API/chatAPI';
import {closeModal} from '../../../store/modalSlice';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const AddChannel = () => {
    const refAdd = useRef('');
    const channels = useSelector((state) => state.channelsInfo.channels);
    const channelsNames = channels.map((channel) => channel.name);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        refAdd.current.focus();
    }, []);

    const validationChannelsSchema = (channels) => yup.object().shape({
        name: yup
            .string()
            .trim()
            .required()
            .min(3)
            .max(20)
            .notOneOf(channels),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationChannelsSchema(channelsNames),
        onSubmit: async (values) => {
            try {
                await addChan(values);
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
                        />
                        <FormLabel htmlFor="name" className="visually-hidden">{t('modals.addChannel')}</FormLabel>
                        <FormControl.Feedback type="invalid">
                            {formik.errors.name}
                        </FormControl.Feedback>
                        <Modal.Footer>
                            <Button variant="secondary" type="button" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
                            <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('modals.send')}</Button>
                        </Modal.Footer>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </>
    );
};

export default AddChannel;
