import React from 'react';

import style from './style.module.css';

const Section = ({ children }) => {
  return <section className={style.section}>{children}</section>;
};


export default Section;
