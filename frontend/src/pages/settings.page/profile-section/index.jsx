import { useState, useRef, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, FormLabel, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { update } from '../../../store/slices/user.slice.js';
import Section from '../section.jsx';
import ToggleButton from './toggle-button.jsx';
import AvatarModal from './avatar-modal.jsx';

const FormControl = styled(Form.Control)`
  border-radius: 0;
  transition: padding 0.2s;

  &:disabled {
    border-color: transparent;
    padding-left: 0;
    padding-right: 0;
    background-color: transparent;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 100%;
  max-width: 13.3rem;
  border: 1px solid gainsboro;
`;

const AvatarLabel = styled(FormLabel)`
  color: #0d6efd;
  text-decoration: underline;
  cursor: pointer;
`;

const getChangedValues = (values, initialValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const hasChanged = value != initialValues[key];
    if (hasChanged) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const ProfileSectionContext = createContext();

const ProfileSection = () => {
  const $avatarInput = useRef();
  const user = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const initialValues = {
    avatar: '',
    avatarModalFile: '',
    name: user.name,
    email: user.email,
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  };
  const [editFieldsId, setEditFieldsId] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(20, 'В имени может быть максимум 32 символа')
      .required('Обязательное поле'),
    email: Yup.string()
      .email('Некорректная почта')
      .required('Обязательное поле'),
    password: Yup.string().when({
      is: () => editFieldsId.includes('password'),
      then: Yup.string()
        .max(32, 'Длина пароля не должен превышать 32 символов')
        .required('Обязательное поле'),
    }),
    newPassword: Yup.string().when({
      is: () => editFieldsId.includes('password'),
      then: Yup.string().required('Обязательное поле'),
    }),
    newPasswordConfirm: Yup.string().when({
      is: () => editFieldsId.includes('password'),
      then: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают')
        .required('Обязательное поле'),
    }),
  });

  return (
    <ProfileSectionContext.Provider value={{ editFieldsId, setEditFieldsId }}>
      <Section>
        <h2 className='mb-4'>Профиль</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize
          onSubmit={async (values, { setFieldError, resetForm }) => {
            const changedValues = getChangedValues(values, initialValues);

            if (Object.keys(changedValues).length > 0) {
              const response = await dispatch(update(changedValues));

              if (response.meta.rejectedWithValue) {
                const responseMessage = JSON.parse(response.payload.message);

                if (responseMessage.email) {
                  setFieldError('email', responseMessage.email.message);
                }

                if (responseMessage.password) {
                  setFieldError('password', responseMessage.password.message);
                }

                return;
              }
            }

            setEditFieldsId([]);
            resetForm();
          }}
        >
          {({
            values,
            errors,
            isSubmitting,
            setFieldValue,
            setFieldError,
            resetForm,
            handleChange,
            handleSubmit,
          }) => (
            <Form
              noValidate
              encType='multipart/form-data'
              onSubmit={handleSubmit}
            >
              <Form.Group className='mb-3' controlId='avatar'>
                <div className='mb-2'>Фото</div>
                <Avatar
                  src={
                    values.avatar
                      ? URL.createObjectURL(values.avatar)
                      : user.avatarUrl
                  }
                />
                <AvatarLabel className='mt-1'>Изменить фото</AvatarLabel>
                <AvatarModal $avatarInput={$avatarInput} />
                <Form.Control
                  ref={$avatarInput}
                  className='d-none'
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(event) => {
                    setFieldValue(
                      'avatarModalFile',
                      event.currentTarget.files[0]
                    );
                  }}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Имя</Form.Label>
                <Row>
                  <Col>
                    <FormControl
                      type='text'
                      value={values.name}
                      onChange={handleChange}
                      disabled={!editFieldsId.includes('name')}
                    />
                  </Col>
                  <Col xs='auto'>
                    <ToggleButton fieldId='name' />
                  </Col>
                </Row>
                <Form.Text className='text-danger'>{errors.name}</Form.Text>
              </Form.Group>

              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Адрес электронной почты</Form.Label>
                <Row>
                  <Col>
                    <FormControl
                      type='email'
                      value={values.email}
                      onChange={handleChange}
                      disabled={!editFieldsId.includes('email')}
                    />
                  </Col>
                  <Col xs='auto'>
                    <ToggleButton fieldId='email' />
                  </Col>
                </Row>
                <Form.Text className='text-danger'>{errors.email}</Form.Text>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>
                  {editFieldsId.includes('password')
                    ? 'Старый пароль'
                    : 'Пароль'}
                </Form.Label>
                <Row>
                  <Col>
                    <FormControl
                      type='password'
                      placeholder='Пароль'
                      value={values.password}
                      onChange={handleChange}
                      disabled={!editFieldsId.includes('password')}
                    />
                  </Col>
                  <Col xs='auto'>
                    <ToggleButton
                      fieldId='password'
                      onCancel={() => {
                        setFieldValue('newPassword', '');
                        setFieldValue('newPasswordConfirm', '');
                        setFieldError('newPassword', '');
                        setFieldError('newPasswordConfirm', '');
                      }}
                    />
                  </Col>
                </Row>
                <Form.Text className='text-danger'>{errors.password}</Form.Text>
              </Form.Group>
              {editFieldsId.includes('password') && (
                <Row className='mt-3'>
                  <Col className='mb-3 mb-sm-0' xs={12} sm={6}>
                    <Form.Group controlId='newPassword'>
                      <Form.Label>Новый пароль</Form.Label>
                      <FormControl
                        type='password'
                        value={values.newPassword}
                        onChange={handleChange}
                      />
                      <Form.Text className='text-danger'>
                        {errors.newPassword}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='newPasswordConfirm'>
                      <Form.Label>Подтвердите новый пароль</Form.Label>
                      <FormControl
                        type='password'
                        value={values.newPasswordConfirm}
                        onChange={handleChange}
                      />
                      <Form.Text className='text-danger'>
                        {errors.newPasswordConfirm}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              )}

              {editFieldsId.length > 0 && (
                <Row className='mt-3'>
                  <Col className='pe-0 mb-2 mb-sm-0' xs={12} sm='auto'>
                    <Button
                      type='submit'
                      size='sm'
                      variant='success'
                      disabled={isSubmitting}
                    >
                      Сохранить
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type='button'
                      size='sm'
                      variant='danger'
                      disabled={isSubmitting}
                      onClick={() => {
                        $avatarInput.current.value = '';
                        resetForm();
                        setEditFieldsId([]);
                      }}
                    >
                      Отменить все
                    </Button>
                  </Col>
                </Row>
              )}
            </Form>
          )}
        </Formik>
      </Section>
    </ProfileSectionContext.Provider>
  );
};

export { ProfileSectionContext };
export default ProfileSection;
