import React from 'react';

import style from './style.module.css';

const CircleLoader = ({
  size = 24,
  thumbColor = '#0d6efd',
  truckColor = '#d6d2d2',
}) => {
  const loaderStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${size / 8}px solid ${truckColor}`,
    borderTopColor: thumbColor,
  };

  return <div className={style.loader} style={loaderStyle} />;
};

export default CircleLoader;
