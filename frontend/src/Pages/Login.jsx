import React, {useRef, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {NavLink, useNavigate} from 'react-router-dom';
import {
    Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import loginImage from '../assets/avatar.jpg';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const navigate = useNavigate();
    const [isAuthFailed, setIsAuthFailed] = useState(false);
    const { setToken } = useAuth();
    const { t } = useTranslation();
    const inputRef = useRef();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: async (values) => {
            setIsAuthFailed(false);
            try {
                const { data } = await axios.post('/api/v1/login', values)
                setToken(JSON.stringify(data));
                navigate('/');
            }
            catch (error) {
                formik.setSubmitting(false);
                setIsAuthFailed(true);
            }
        },
    });
    return (
        <Container className="h-100" fluid>
            <Row className=" h-100 justify-content-center align-content-center">
                <Col className="col-12 col-md-8 col-xxl-6">
                    <Card className="shadow-sm">
                        <Card.Body className="p-5 row">
                            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                <img
                                    src={loginImage}
                                    className="roundedCircle"
                                    alt="Log in page"
                                />
                            </div>
                            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                                <fieldset disabled={formik.isSubmitting}>
                                <h1 className="text-center mb-4">{t('login.enter')}</h1>
                                    <Form.Group className="form-floating mb-3">
                                        <FloatingLabel controlId="username" label={t('forms.usernameLogin')}>
                                            <Form.Control
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.username}
                                                onBlur={formik.handleBlur}
                                                disabled={formik.isSubmitting}
                                                placeholder="username"
                                                name="username"
                                                autoComplete="username"
                                                isInvalid={isAuthFailed}
                                                required
                                                ref={inputRef}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="form-floating mb-3">
                                        <FloatingLabel controlId="password" label={t('forms.password')}>
                                            <Form.Control
                                                type="password"
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                onBlur={formik.handleBlur}
                                                disabled={formik.isSubmitting}
                                                placeholder="Пароль"
                                                name="password"
                                                autoComplete="password"
                                                isInvalid={isAuthFailed}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid" className="invalid-feedback">{t('forms.invalidUsername')}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button type="submit" disabled={formik.isSubmitting} variant="outline-primary" className="w-100 mb-3">{t('forms.enter')}</Button>
                                </fieldset>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="p-4">
                            <div className="text-center">
                                <span>{t('login.noAccount')} </span>
                                <NavLink to='/signup'>{t('login.signUp')}</NavLink>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
