import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

import { register } from '../store/slices/userSlice.js';
import AuthLayout from '../layouts/AuthLayout/index.jsx';
import PasswordControl from '../components/PasswordControl/index.jsx';
import ErrorContainer from '../components/ErrorContainer/index.jsx';
import CircleLoader from '../components/CircleLoader/index.jsx';
import PasswordStrength from '../components/PasswordStrength/index.jsx';
import registerSchema from '../utils/registerSchema.js';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  return (
    <AuthLayout>
      <h1 className='h3 mb-4'>Регистрация</h1>
      <Formik
        initialValues={{ name: '', email: '', newPassword: '' }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setFieldError }) => {
          const { name, email, newPassword: password } = values;
          const response = await dispatch(register({ name, email, password }));

          if (response.meta.rejectedWithValue) {
            if (response.payload.status === 409) {
              setFieldError('email', 'Электронный адрес уже зарегистрирован');
              return;
            }

            setError('Ошибка');
            return;
          }

          navigate('/login');
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
          <Form onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting}>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  className='rounded-0'
                  type='text'
                  placeholder='Ваше имя'
                  value={values.name}
                  onChange={(event) => {
                    setFieldTouched('name');
                    handleChange(event);
                    setError('');
                  }}
                />
                {errors.name && touched.name && (
                  <ErrorContainer isField>{errors.name}</ErrorContainer>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Почта</Form.Label>
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
              <Form.Group className='mb-3' controlId='newPassword'>
                <Form.Label>Пароль</Form.Label>
                <PasswordControl
                  className='rounded-0'
                  placeholder='Введите пароль'
                  value={values.newPassword}
                  onChange={(event) => {
                    setFieldTouched('newPassword');
                    handleChange(event);
                    setError('');
                  }}
                />
                {errors.newPassword && touched.newPassword ? (
                  <ErrorContainer isField>{errors.newPassword}</ErrorContainer>
                ) : (
                  <PasswordStrength password={values.newPassword} />
                )}
              </Form.Group>
              {error && <ErrorContainer>{error}</ErrorContainer>}
              <Button
                className='d-block mt-3 mx-auto position-relative'
                type='submit'
              >
                <span style={{ opacity: isSubmitting ? 0 : 1 }}>Создать</span>
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
        <span className='text-muted'>Уже есть аккаунт? </span>
        <Link to='/login'>ВОЙТИ</Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
