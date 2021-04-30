import React, { useState, useEffect } from 'react';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { auth, googleAuthProvider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/crateupdate`.replaceAll(/'/g, ''),
    {},
    {
      headers: {
        authtoken,
      },
    },
  );
};

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => console.log('resonse:', res))
        .catch();

      // dispatch({
      //   type: 'LOGGED_IN_USER',
      //   payload: {
      //     email: user.email,
      //     token: idTokenResult.token,
      //   },
      // });
      // history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          placeholder='Введите адрес электроной почты'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          placeholder='Введите установленный пароль'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <Button
        type='primary'
        className='mb-3'
        icon={<MailOutlined />}
        onClick={handleSubmit}
        size='large'
        disabled={!email || password.length < 6}
      >
        Войти с логином и паролем
      </Button>
    </form>
  );
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Вход</h4>
          )}
          {loginForm()}

          <Button
            type='danger'
            className='mb-3'
            icon={<GoogleOutlined />}
            onClick={googleLogin}
            size='large'
            // disabled={!email || password.length < 6}
          >
            Войти через Google
          </Button>
          <Link to='/forgot/password' className='float-right text-danger'>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
