import React, { useState } from 'react';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Проверьте свою почту для завершения восстановления');
      })
      .catch(error => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? (
        <h4 className='text-danger'>Загружается...</h4>
      ) : (
        <h4>Восстановление пароля</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='введите ваш емайл'
          autoFocus
        />
        <br />
        <button className='btn btn-raised' disabled={!email}>
          Восстановить
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
