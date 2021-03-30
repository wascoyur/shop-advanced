import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          placeholder='Введите адрес электроной почты'
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          placeholder='Введите установленный пароль'
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <Button
        type='primary'
        className='mb-3'
        icon={<MailOutlined />}
        onClick={handleSubmit}
        disabled={!email || !password.length <6}
      >
        Войти с логином и паролем
      </Button>
    </form>
  );
  const handleSubmit = async e => {
    e.preventDefault();
    console.table(email, password);
  };
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Вход</h4>
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
