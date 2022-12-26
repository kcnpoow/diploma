import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Gear } from 'react-bootstrap-icons';

import { logout } from '../../../../store/slices/userSlice.js';
import style from './style.module.css';

const UserContainer = () => {
  const dispatch = useDispatch();
  const $userContainer = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOutsideClick = (event) => {
    if (isDropdownOpen && !$userContainer.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleEscapeDown = (event) => {
    if (event.keyCode === 27) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeDown);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeDown);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={$userContainer}>
      <button
        className={style.userBtn}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className={style.avatar} />
      </button>
      <ul
        className={`${style.dropdown} ${
          isDropdownOpen ? style.dropdownOpen : ''
        }`}
      >
        <li>
          <Link to='/settings'>
            <Gear className='me-2' />
            Настройки
          </Link>
        </li>
        <li>
          <button
            className={style.logoutBtn}
            onClick={() => dispatch(logout())}
          >
            Выйти
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserContainer;
