import React, { useEffect, useRef, useState } from 'react';
import {
    Card,
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Row,
    Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import ImageSignUp from '../assets/avatar_1.jpg';
import {useAuth} from '../hooks/useAuth';

const SignUp = () => {
    const [isFailed, setIsFailed] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { setToken } = useAuth();
    const usernameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);
    const registrationValidation = yup.object().shape({
        username: yup
            .string()
            .min(3)
            .max(20)
            .trim()
            .typeError('required')
            .required(),
        password: yup
            .string()
            .trim()
            .min(6)
            .typeError('required')
            .required(),
        confirmPassword: yup
            .string()
            .test(
                'confirmPassword',
                (password, context) => password === context.parent.password,
            ),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registrationValidation,
        onSubmit: async (values) => {
            setIsFailed(false);
            setIsSubmitted(true);
            try {
                const { username, password } = values;
                const { data } = await axios.post('/api/v1/signup', { username, password });
                setToken(JSON.stringify(data));
                navigate('/');
            } catch (error) {
                console.log(error);
                if (error.response.status === 409) {
                    setIsFailed(true);
                    usernameRef.current.select();
                }
            }
            setIsSubmitted(false);
        },
    });

    return (
        <Container className="container-fluid h-100">
            <Row className="justify-content-center align-content-center h-100">
                <Col className="col-12 col-md-8 col-xxl-6">
                    <Card className="shadow-sm">
                        <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                            <div>
                                <img
                                    src={ImageSignUp}
                                    className="rounded-circle"
                                    alt="Registratiion Avatar"
                                />
                            </div>
                            <Form className="w-50">
                                <h1 className="text-center mb-4">Регистрация</h1>
                                <FormGroup className="form-floating mb-3">
                                    <FormControl
                                        id="username"
                                        name="username"
                                        ref={usernameRef}
                                        placeholder={'Имя пользователя'}
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={isSubmitted}
                                        isInvalid={
                                            (formik.errors.username && formik.touched.username)
                                            || isFailed
                                        }
                                    />
                                    <FormLabel htmlFor="username">
                                        {'Имя пользователя'}
                                    </FormLabel>
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="invalid-feedback"
                                    >
                                        {formik.errors.username || null}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="form-floating mb-3">
                                    <FormControl
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder={'Пароль'}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={isSubmitted}
                                        isInvalid={
                                            (formik.errors.password && formik.touched.password)
                                            || isFailed
                                        }
                                    />
                                    <FormLabel htmlFor="password">{'Пароль'}</FormLabel>
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="invalid-feedback"
                                    >
                                        {formik.errors.password || null}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="form-floating mb-3">
                                    <FormControl
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder={'a'}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={isSubmitted}
                                        isInvalid={
                                            (formik.errors.confirmPassword
                                                && formik.touched.confirmPassword)
                                            || isFailed
                                        }
                                    />
                                    <FormLabel htmlFor="confirmPassword">{'Подтвердите пароль'}</FormLabel>
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="invalid-feedback"
                                    >
                                        {formik.errors.confirmPassword || 'Такой пользователь уже существует'}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <Button
                                    type="submit"
                                    disabled={isSubmitted}
                                    className="w-100"
                                    variant="outline-primary"
                                    onClick={formik.handleSubmit}
                                >
                                    {'Зарегистрироваться'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;