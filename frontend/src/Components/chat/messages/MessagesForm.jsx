import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ArrowRightSquare } from 'react-bootstrap-icons';
import {useDispatch} from 'react-redux';
import {addMessage} from '../../../store/messagesSlice';

const MessagesForm = ({ activeChannel }) => {
    const messageRef = useRef(null);
    const validationSchema = yup.object().shape({
        message: yup.string().trim().required('Required'),
    });

    useEffect(() => {
        messageRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: async (values) => {
            const message = {
                body: values.body,
                channelId: activeChannel.id,
                username: JSON.parse(localStorage.userToken).username
            };
            try {
                console.log('MESSAGE', message);
            } catch (e) {
                console.log(e.message);
            }
        },
        validateOnChange: validationSchema,
    });
    return (
        <div className="mt-auto px-5 py-3">
            <Form
                noValidate
                className="py-1 border rounded-2"
                onSubmit={formik.handleSubmit}
            >
                <Form.Group className="input-group">
                    <Form.Control
                        name="body"
                        ref={messageRef}
                        placeholder="Введите сообщение..."
                        className="border-0 p-0 ps-2"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        id="body"
                    />
                    <Button
                        variant="group-vertical"
                        disabled={formik.isSubmitting}
                        onClick={formik.handleSubmit}
                    >
                        <ArrowRightSquare size={20}/>
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default MessagesForm;