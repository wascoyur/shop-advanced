import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/dashboard' className='nav-link'>
            Панель управления
          </Link>
        </li>
      </ul>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/products' className='nav-link'>
            Товары
          </Link>
        </li>
      </ul>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/category' className='nav-link'>
            Категории
          </Link>
        </li>
      </ul>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/sub' className='nav-link'>
            Подкатегории
          </Link>
        </li>
      </ul>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/cupons' className='nav-link'>
            Купоны
          </Link>
        </li>
      </ul>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/user/password' className='nav-link'>
            Сменить пароль
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
