import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import Header from './header/index.jsx';

const Main = styled.main`
  /* padding-top depends on header height */
  padding-top: 4rem;
`;

const MainLayout = ({ children, title }) => {
  return (
    <>
      <Header title={title} />
      <Main>
        <Container fluid>{children}</Container>
      </Main>
    </>
  );
};

export default MainLayout;
