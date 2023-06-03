import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
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
        onSubmit: values => {
            alert('sent');
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Ваш ник"
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Пароль"
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;