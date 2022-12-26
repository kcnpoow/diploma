import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useFormikContext } from 'formik';

const FormButtons = () => {
  const { touched, resetForm } = useFormikContext();
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(false);
    for (const field of Object.entries(touched)) {
      if (field[1]) {
        setIsChanging(true);
        break;
      }
    }
  }, [touched]);

  return (
    <div
      className='mt-4'
      style={{ display: isChanging ? 'flex' : 'none' }}
    >
      <Button className='me-3' type='submit' size='sm' variant='success'>
        Сохранить
      </Button>
      <Button
        size='sm'
        type='button'
        variant='danger'
        onClick={() => resetForm()}
      >
        Отменить все
      </Button>
    </div>
  );
};

export default FormButtons;
