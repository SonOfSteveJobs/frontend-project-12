import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
    Modal, FormGroup, FormControl, FormLabel, Button, Form,
} from 'react-bootstrap';
import * as yup from 'yup';
import {useSelector} from 'react-redux';
import {addChan} from '../../../API/chatAPI';

const AddChannel = ({closeModalHandler}) => {
    const refAdd = useRef('');
    const channels = useSelector((state) => state.channelsInfo.channels);
    const channelsNames = channels.map((channel) => channel.name);

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
            } catch (e) {
                console.log(e);
            }
            finally {
                closeModalHandler();
            }
        },
    });
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Добавить канал</Modal.Title>
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
                        <FormLabel htmlFor="name" className="visually-hidden">Название канала</FormLabel>
                        <FormControl.Feedback type="invalid">
                            {formik.errors.name}
                        </FormControl.Feedback>
                        <Modal.Footer>
                            <Button variant="secondary" type="button" onClick={closeModalHandler}>Отменить</Button>
                            <Button variant="primary" type="submit" onClick={formik.handleSubmit}>Отправить</Button>
                        </Modal.Footer>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </>
    );
};

export default AddChannel;