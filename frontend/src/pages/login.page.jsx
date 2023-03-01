import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login } from '../store/slices/user.slice.js';
import AuthLayout, {
  PasswordControl,
  ErrorMessage,
  SubmitButton,
} from '../layouts/auth.layout/index.jsx';

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  return (
    <AuthLayout>
      <h1 className='mb-4 h3'>Вход</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { resetForm }) => {
          const { email, password } = values;
          const response = await dispatch(login({ email, password }));

          if (response.meta.rejectedWithValue) {
            setError(response.payload);
            resetForm();
            return;
          }

          if (response.payload && response.payload.accessToken) {
            localStorage.setItem('accessToken', response.payload.accessToken);
          }
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
                  placeholder='Почта'
                  value={values.email}
                  onChange={(event) => {
                    setFieldTouched('email');
                    handleChange(event);
                    setError('');
                  }}
                />
                {errors.email && touched.email && (
                  <ErrorMessage isField>{errors.email}</ErrorMessage>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
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
                  <ErrorMessage isField>{errors.password}</ErrorMessage>
                )}
              </Form.Group>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <div className='d-flex justify-content-center w-100 mt-3'>
                <SubmitButton isSubmitting={isSubmitting}>Войти</SubmitButton>
              </div>
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
