import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import {sendMessage} from '../../../API/chatAPI';
import {useTranslation} from 'react-i18next';

const MessagesForm = ({ activeChannel }) => {
    const messageRef = useRef(null);
    const { t } = useTranslation();
    const validationSchema = yup.object({
        body: yup
            .string()
            .trim()
            .required(),
    })

    useEffect(() => {
        messageRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const message = {
                body: values.body,
                channelId: activeChannel.id,
                username: JSON.parse(localStorage.userToken).username
            };
            try {
                await sendMessage(message);
                formik.resetForm();
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
                        placeholder={t('messages.messagePlaceholder')}
                        className="border-0 p-0 ps-2"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        id="body"
                    />
                    <Button
                        variant="group-vertical"
                        disabled={formik.isSubmitting || !formik.values.body}
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
