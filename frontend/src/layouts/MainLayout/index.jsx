import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';

import UserContainer from './components/UserContainer/index.jsx';
import style from './style.module.css';

const MainLayout = ({ children }) => {
  const [showOffcnavas, setShowOffcanvas] = useState(false);

  return (
    <Fragment>
      <header className={style.header}>
        <Container fluid>
          <div className='position-relative'>
            <Row className='align-items-center'>
              <Col>
                <button onClick={() => setShowOffcanvas(true)}>
                  <List size={30} />
                </button>
                <Offcanvas
                  show={showOffcnavas}
                  onHide={() => setShowOffcanvas(false)}
                ></Offcanvas>
              </Col>
              <Col className='ms-auto' xs='auto'>
                <UserContainer />
              </Col>
            </Row>
          </div>
        </Container>
      </header>
      <main>
        <Container className='py-3' fluid>
          {children}
        </Container>
      </main>
    </Fragment>
  );
};

export default MainLayout;
