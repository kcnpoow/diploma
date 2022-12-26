import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useFormikContext } from 'formik';

import style from './style.module.css';

const FormGroup = ({ className, controlId, label, type }) => {
  const $control = useRef();
  const [changeMode, setChangeMode] = useState(false);
  const {
    initialValues,
    values,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleChange,
  } = useFormikContext();

  const handleChangeClick = () => {
    setChangeMode(true);
    setFieldValue(controlId, '');
    setFieldTouched(controlId);
    $control.current.removeAttribute('readonly');
    $control.current.focus();
  };

  const handleCancelClick = () => {
    setChangeMode(false);
    setFieldValue(controlId, initialValues[controlId]);
    setFieldError(controlId, '');
    setFieldTouched(controlId, false);
    $control.current.setAttribute('readonly', '');
  };

  useEffect(() => {
    if (!touched[controlId]) {
      setChangeMode(false);
      $control.current.setAttribute('readonly', '');
    }
  }, [touched]);

  return (
    <Row className={className}>
      <Col className='mb-2' xs={12}>
        <label htmlFor={controlId}>{label}</label>
      </Col>
      <Col>
        <input
          ref={$control}
          id={controlId}
          className={`${style.control} ${
            changeMode ? style.controlChangeMode : ''
          }`}
          name={controlId}
          type={type}
          value={values[controlId]}
          onChange={handleChange}
          readOnly
        />
      </Col>
      <Col className='ps-0' xs='auto'>
        {changeMode ? (
          <button
            className={style.cancelBtn}
            type='button'
            onClick={handleCancelClick}
          >
            отменить
          </button>
        ) : (
          <button
            className={style.changeBtn}
            type='button'
            onClick={handleChangeClick}
          >
            изменить
          </button>
        )}
      </Col>
    </Row>
  );
};

export default FormGroup;
