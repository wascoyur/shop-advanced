import React, { useState } from 'react';
import { Loading3QuartersOutlined, MailOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

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
        disabled={!email || password.length < 6}
      >
        Войти с логином и паролем
      </Button>
    </form>
  );
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token
        }
      });

      history.push('/')
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      setLoading(false)
    }
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
