import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { register } from '../../store/slices/user.slice.js';
import AuthLayout, {
  PasswordControl,
  ErrorMessage,
  SubmitButton,
} from '../../layouts/auth.layout/index.jsx';
import PasswordMeter from './password-meter.jsx';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(20, 'В имени может быть максимум 32 символа')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Пожалуйста, введите корректную почту')
    .required('Обязательное поле'),
  password: Yup.string()
    .max(32, 'Длина пароля не должен превышать 32 символов')
    .required('Обязательное поле'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  return (
    <AuthLayout>
      <h1 className='mb-4 h3'>Регистрация</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setFieldError }) => {
          const { name, email, password } = values;
          const response = await dispatch(register({ name, email, password }));

          if (response.meta.rejectedWithValue) {
            if (response.payload.status === 409) {
              setFieldError('email', response.payload.message);
            } else {
              setError(response.payload);
            }
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
          <Form noValidate onSubmit={handleSubmit}>
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
                  }}
                />
                {errors.name && touched.name && (
                  <ErrorMessage isField>{errors.name}</ErrorMessage>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Почта</Form.Label>
                <Form.Control
                  className='rounded-0'
                  type='text'
                  placeholder='Почта'
                  value={values.email}
                  onChange={(event) => {
                    setFieldTouched('email');
                    handleChange(event);
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
                  }}
                />
                {errors.password && touched.password ? (
                  <ErrorMessage isField>{errors.password}</ErrorMessage>
                ) : (
                  <PasswordMeter password={values.password} />
                )}
              </Form.Group>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <div className='d-flex justify-content-center w-100 mt-3'>
                <SubmitButton isSubmitting={isSubmitting}>Создать</SubmitButton>
              </div>
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
