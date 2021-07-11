import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Affix } from 'antd';
import Search from '../forms/Search';

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
    <Affix>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' style={{display:'inline'}}>
        <Item key='home' icon={<AppstoreOutlined />}>
          <Link to='/'>Домой</Link>
        </Item>

        <Item key='shop' icon={<ShopOutlined/>}>
          <Link to='/shop'>Магазин</Link>
        </Item>

        {!user && (
          <Item
            key='register'
            icon={<UserAddOutlined />}
            className='float-right'>
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
            key='submenu'
            icon={<SettingOutlined />}
            title={user.email && user.email.split('@')[0]}
            className='float-right'>
            {user && user.role === 'subscriber' ? (
              <Item key='1'>
                <Link to='/user/history'>Панель управления</Link>
              </Item>
            ) : null}
            {user && user.role === 'admin' ? (
              <Item key='2'>
                <Link to='/admin/dashboard'>
                  Панель управления администратора
                </Link>
              </Item>
            ) : null}

            <Item icon={<LogoutOutlined />} onClick={logout} key='3'>
              Выход
            </Item>
          </SubMenu>
        )}
        <Item key='4' className='float-right'>
          <Search />
        </Item>
      </Menu>
    </Affix>
  );
};

export default Header;
