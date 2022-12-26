import React from 'react';

import style from './style.module.css';

const mediumPassword = new RegExp(
  '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]))|((?=.*[a-z])(?=.*[A-Z]))'
);

const strongPassword = new RegExp(
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])'
);

const checkPasswordStrength = (password) => {
  if (strongPassword.test(password)) {
    return 1;
  } else if (mediumPassword.test(password)) {
    return 0;
  } else {
    return -1;
  }
};

const PasswordStrength = ({ password = '' }) => {
  const passwordLevel = checkPasswordStrength(password);

  return (
    <div className={style.container}>
      <div
        className={style.weak}
        style={{ opacity: password !== '' && passwordLevel > -2 ? 1 : 0 }}
      />
      <div
        className={style.medium}
        style={{ opacity: passwordLevel > -1 ? 1 : 0 }}
      />
      <div
        className={style.strong}
        style={{ opacity: passwordLevel > 0 ? 1 : 0 }}
      />
    </div>
  );
};

export default PasswordStrength;
