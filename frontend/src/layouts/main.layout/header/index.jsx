import { useState, useEffect } from 'react';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';
import styled, { css } from 'styled-components';

import Menu from './menu.jsx';
import UserDropdown from './user-dropdown.jsx';

const StyledHeader = styled.header`
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  background-color: white;
  border-bottom: 1px solid #dadce0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${({ scrolled }) =>
    scrolled &&
    css`
      -webkit-box-shadow: 0px 4px 5px -3px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 4px 5px -3px rgba(34, 60, 80, 0.2);
      box-shadow: 0px 4px 5px -3px rgba(34, 60, 80, 0.2);
    `}
`;

const Title = styled.h1`
  margin-bottom: 0;
  font-size: 1.7rem;
`;

const Header = ({ title = '' }) => {
  const [windowScrollY, setWindowScrollY] = useState(window.scrollY);

  const handleScroll = () => {
    setWindowScrollY(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledHeader scrolled={windowScrollY > 5}>
      <Container fluid>
        <div className='position-relative'>
          <Row className='align-items-center'>
            <Col className='pe-0' xs='auto'>
              <Menu />
            </Col>
            <Col>
              <Title>{title}</Title>
            </Col>
            <Col className='ms-auto' xs='auto'>
              <UserDropdown />
            </Col>
          </Row>
        </div>
      </Container>
    </StyledHeader>
  );
};

export default Header;
