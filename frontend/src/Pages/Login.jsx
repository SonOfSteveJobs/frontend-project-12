import React, {useContext, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {NavLink, useNavigate} from 'react-router-dom';
import {
    Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import loginImage from '../assets/avatar.jpg';
import axios from 'axios';
import {AuthContext} from '../Components/context';

const Login = () => {
    const navigate = useNavigate();
    const [isAuthFailed, setIsAuthFailed] = useState(false);
    const {isAuth, setIsAuth} = useContext(AuthContext);

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
                const res = await axios.post('/api/v1/login', values)
                localStorage.setItem('userId', JSON.stringify(res.data));
                navigate('/');
                setIsAuth(true);
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
                                <h1 className="text-center mb-4">Войти</h1>
                                    <Form.Group className="form-floating mb-3">
                                        <FloatingLabel controlId="username" label='Ваш ник'>
                                            <Form.Control
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.username}
                                                onBlur={formik.handleBlur}
                                                disabled={formik.isSubmitting}
                                                placeholder="Ваш ник"
                                                name="username"
                                                autoComplete="username"
                                                isInvalid={isAuthFailed}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="form-floating mb-3">
                                        <FloatingLabel controlId="password" label='Пароль'>
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
                                            <Form.Control.Feedback type="invalid" className="invalid-feedback">Неверные имя пользователя или пароль</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button type="submit" disabled={formik.isSubmitting} variant="outline-primary" className="w-100 mb-3">Войти</Button>
                                </fieldset>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="p-4">
                            <div className="text-center">
                                <span>Нет аккаунта?</span>
                                <NavLink to='/signup'>Регистрация</NavLink>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;