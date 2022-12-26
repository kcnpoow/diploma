import React from 'react';
import { Container } from 'react-bootstrap';

import style from './style.module.css';

const AuthLayout = ({ children }) => {
  return (
    <Container className={`${style.wrapper} py-3`} fluid>
      <div className={style.wrapperInner}>{children}</div>
    </Container>
  );
};

export default AuthLayout;
