import { useFormik } from 'formik';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import ImageSignUp from '../assets/avatar_1.jpg';
import { useAuth } from '../hooks/useAuth';
import routes from '../routes/routes';

const SignUp = () => {
  const [isFailed, setIsFailed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { signUp } = useAuth();
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const registrationValidation = yup.object().shape({
    username: yup
      .string()
      .min(3, t('forms.min'))
      .max(20, t('forms.max'))
      .trim()
      .typeError(t('forms.required'))
      .required(t('forms.required')),
    password: yup
      .string()
      .trim()
      .min(6, t('forms.minPassword'))
      .typeError(t('forms.required'))
      .required(t('forms.required')),
    confirmPassword: yup
      .string()
      .test(
        'confirmPassword',
        t('forms.confirmPasswordError'),
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
        const signUpSuccessful = await signUp(values);
        if (signUpSuccessful) {
          navigate(routes.chatPage());
        } else {
          setIsFailed(true);
          usernameRef.current.select();
        }
      } catch (error) {
        console.error(error);
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
                <h1 className="text-center mb-4">{t('signUp.registration')}</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    id="username"
                    name="username"
                    ref={usernameRef}
                    placeholder={t('signUp.username')}
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
                    {t('forms.usernameSignUp')}
                  </FormLabel>
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-tooltip"
                  >
                    {formik.errors.username || null}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t('forms.usernameSignUp')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitted}
                    isInvalid={
                      (formik.errors.password && formik.touched.password)
                      || isFailed
                    }
                  />
                  <FormLabel htmlFor="password">{t('forms.password')}</FormLabel>
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-tooltip"
                  >
                    {formik.errors.password || null}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder={t('forms.confirmPassword')}
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
                  <FormLabel htmlFor="confirmPassword">{t('forms.confirmPassword')}</FormLabel>
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-tooltip"
                  >
                    {formik.errors.confirmPassword || t('forms.userExist')}
                  </Form.Control.Feedback>
                </FormGroup>
                <Button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-100"
                  variant="outline-primary"
                  onClick={formik.handleSubmit}
                >
                  {t('forms.registration')}
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
