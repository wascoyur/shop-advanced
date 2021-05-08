import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Домой</Link>
      </Item>

      {!user && (
        <Item key='register' icon={<UserAddOutlined />} className='float-right'>
          <Link to='/register'>Регистрация</Link>
        </Item>
      )}

      {!user && (
        <Item key='login' icon={<UserOutlined />} className='float-right'>
          <Link to='/login'>Вход</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}
          className='float-right'>
          {user && user.role === 'subscriber' ? (
            <Item>
              <Link to='/user/history'>Панель управления</Link>
            </Item>
          ) : null}
          {user && user.role === 'admin' ? (
            <Item>
              <Link to='/admin/dashboard'>
                Панель управления администратора
              </Link>
            </Item>
          ) : null}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Выход
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
