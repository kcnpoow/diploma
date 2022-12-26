import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

import style from './style.module.css';

const PasswordControl = ({ className, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='position-relative'>
      <FormControl
        {...props}
        className={`${style.passwordControl} ${className}`}
        type={isVisible ? 'text' : 'password'}
      />
      <button
        className={style.visibilityToggler}
        type='button'
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? <EyeSlash color='black' /> : <Eye color='black' />}
      </button>
    </div>
  );
};

export default PasswordControl;
