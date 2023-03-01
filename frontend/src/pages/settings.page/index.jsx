import styled from 'styled-components';

import MainLayout from '../../layouts/main.layout/index.jsx';
import ProfileSection from './profile-section/index.jsx';

const Wrapper = styled.div`
  max-width: 45rem;
  margin-left: auto;
  margin-right: auto;
`;

const SettingsPage = () => {
  return (
    <MainLayout title='Настройки'>
      <Wrapper className='py-5'>
        <ProfileSection />
      </Wrapper>
    </MainLayout>
  );
};

export default SettingsPage;
