import { Menu } from 'antd';
import { useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;
const Header = () => {
    const [current, setCurrent] = useState('home');
    

  const handleClick = (e) => {
    setCurrent(e.key);
  };

    return (
      
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<HomeOutlined />}>
        <Link to='/'>Домой</Link>
      </Item>
      <SubMenu key='SubMenu' icon={<SettingOutlined />} title='Действия'>
        <Item key='point1'>Пункт 1 </Item>
        <Item key='point2'>Пункт 2 </Item>
      </SubMenu>
      <Item key='signin' icon={<UserOutlined />} className='float-right'>
        <Link to='/login'>Войти с учетной записью</Link>
      </Item>
      <Item
        key='signup'
        icon={<UserAddOutlined />}
        className='float-right'
      >
        <Link to='/register'>Зарегистрироваться</Link>
      </Item>
    </Menu>
  );
};

export default Header;
