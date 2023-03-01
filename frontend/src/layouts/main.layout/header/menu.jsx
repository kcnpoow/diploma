import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';

const Menu = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShowClick = () => {
    setShowOffcanvas(true);
  };

  const handleHide = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <button onClick={handleShowClick}>
        <List size={30} />
      </button>
      <Offcanvas
        style={{ borderRight: 'none' }}
        show={showOffcanvas}
        onHide={handleHide}
      >
      </Offcanvas>
    </>
  );
};

export default Menu;
