import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { update } from '../../../../store/slices/userSlice.js';
import Section from '../Section/index.jsx';
import FormGroup from '../FormGroup/index.jsx';
import FormButtons from '../FormButtons.jsx';
import registerSchema from '../../../../utils/registerSchema.js';

const PersonalSection = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.user.info);

  return (
    <Section>
      <h3 className='mb-4'>Персональные данные</h3>
      <Formik
        initialValues={{ name, email }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          const { name, email } = values;
          dispatch(update({ name, email }));
        }}
      >
        {({ errors, setTouched, handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <FormGroup controlId='name' label='Имя' type='text' />
            <small className='text-danger'>{errors.name}</small>
            <FormGroup
              className='mt-3'
              controlId='email'
              label='Почта'
              type='email'
            />
            <small className='text-danger'>{errors.email}</small>
            <FormButtons />
          </form>
        )}
      </Formik>
    </Section>
  );
};

export default PersonalSection;
