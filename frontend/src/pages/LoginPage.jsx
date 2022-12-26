import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login } from '../store/slices/userSlice.js';
import AuthLayout from '../layouts/AuthLayout/index.jsx';
import PasswordControl from '../components/PasswordControl/index.jsx';
import ErrorContainer from '../components/ErrorContainer/index.jsx';
import CircleLoader from '../components/CircleLoader/index.jsx';

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  return (
    <AuthLayout>
      <h1 className='h3 mb-4'>Вход</h1>
      <Formik
        initialValues={{ email: '', password: '', remember: false }}
        validationSchema={loginSchema}
        onSubmit={async (values, { resetForm }) => {
          setError('');

          const { email, password } = values;
          const response = await dispatch(login({ email, password }));

          if (response.meta.rejectedWithValue) {
            setError(response.payload.message);
            resetForm();
          }

          sessionStorage.setItem('rememberPassword', values.remember);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldTouched,
          handleChange,
          handleSubmit,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting}>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Адрес электронной почты</Form.Label>
                <Form.Control
                  className='rounded-0'
                  type='email'
                  placeholder='Почта'
                  value={values.email}
                  onChange={(event) => {
                    setFieldTouched('email');
                    handleChange(event);
                    setError('');
                  }}
                />
                {errors.email && touched.email && (
                  <ErrorContainer isField>{errors.email}</ErrorContainer>
                )}
              </Form.Group>
              <Form.Group className='mb-2' controlId='password'>
                <Form.Label>Пароль</Form.Label>
                <PasswordControl
                  className='rounded-0'
                  placeholder='Введите пароль'
                  value={values.password}
                  onChange={(event) => {
                    setFieldTouched('password');
                    handleChange(event);
                    setError('');
                  }}
                />
                {errors.password && touched.password && (
                  <ErrorContainer isField>{errors.password}</ErrorContainer>
                )}
              </Form.Group>
              <Form.Check
                id='remember'
                className='mb-3'
                label='Запомнить пароль'
                value={values.remember}
                onChange={handleChange}
              />
              {error && <ErrorContainer>{error}</ErrorContainer>}
              <Button
                className='d-block mt-3 mx-auto position-relative'
                type='submit'
                onClick={() => setError('')}
              >
                <span style={{ opacity: isSubmitting ? 0 : 1 }}>Войти</span>
                {isSubmitting && (
                  <div className='d-flex align-items-center justify-content-center position-absolute top-0 bottom-0 start-0 end-0'>
                    <CircleLoader
                      size={18}
                      thumbColor='#ffffff'
                      truckColor='transparent'
                    />
                  </div>
                )}
              </Button>
            </fieldset>
          </Form>
        )}
      </Formik>
      <div className='mt-3 text-center'>
        <span className='text-muted'>Еще нет аккаунта? </span>
        <Link to='/register'>СОЗДАТЬ</Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
