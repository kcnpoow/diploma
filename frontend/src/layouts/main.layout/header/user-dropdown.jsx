import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Gear } from 'react-bootstrap-icons';
import styled, { css } from 'styled-components';

import { logout } from '../../../store/slices/user.slice.js';

const UserButton = styled.button`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  background-color: grey;
  border-radius: 50%;
`;

const Dropdown = styled.ul`
  width: 100%;
  max-width: 14rem;
  padding: 1.4rem 1.2rem;
  margin-top: 0.45rem;
  user-select: none;
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 0.4rem;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  position: absolute;
  right: 0;
  transform: scale(0);
  transform-origin: top right;
  transition: transform 0.3s;
  z-index: 999;

  ${({ expand }) =>
    expand &&
    css`
      transform: scale(1);
    `}
`;

const DropdownItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
`;

const LogoutButton = styled(Button)`
  display: inline-block;
  width: 100%;
  padding: 0;
  color: #ffffff;
  border-radius: 0.25rem;
`;

const UserDropdown = () => {
  const $userContainer = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.info);
  const [isDropdownExpand, setIsDropdownExpand] = useState(false);

  const handleShowClick = () => {
    setIsDropdownExpand(!isDropdownExpand);
  };

  const handleOutsideClick = (event) => {
    if (isDropdownExpand && !$userContainer.current.contains(event.target)) {
      setIsDropdownExpand(false);
    }
  };

  const handleEscapeDown = (event) => {
    if (isDropdownExpand && event.keyCode === 27) {
      setIsDropdownExpand(false);
    }
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeDown);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeDown);
    };
  }, [isDropdownExpand]);

  return (
    <div ref={$userContainer}>
      <UserButton onClick={handleShowClick}>
        <Avatar src={user.avatarUrl} alt='' />
      </UserButton>
      <Dropdown expand={isDropdownExpand}>
        <DropdownItem>
          <Link to='/settings'>
            <Gear className='me-2' />
            Настройки
          </Link>
        </DropdownItem>
        <DropdownItem>
          <LogoutButton variant='danger' onClick={handleLogoutClick}>
            Выйти
          </LogoutButton>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
