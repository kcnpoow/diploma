import React from 'react';

import style from './style.module.css';

const ErrorContainer = ({ children, isField }) => {
  return (
    <div
      className={`${style.errorContainer} ${
        isField ? style.errorContainerField : ''
      }`}
    >
      {children}
    </div>
  );
};

export default ErrorContainer;
