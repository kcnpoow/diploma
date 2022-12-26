import React from 'react';

import MainLayout from '../../layouts/MainLayout/index.jsx';
import PersonalSection from './components/PersonalSection/index.jsx';
import style from './style.module.css';

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className={style.wrapper}>
        <PersonalSection />
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
