import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/user/history' className='nav-link'>
            История
          </Link>
        </li>
      </ul>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/user/password' className='nav-link'>
            Пароль
          </Link>
        </li>
      </ul>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/user/wishlist' className='nav-link'>
            Список ожидания
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
