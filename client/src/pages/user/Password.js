import { auth } from '../../firebase';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UserNav from '../../components/nav/UserNav';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('pass', password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success('Пароль обновлен');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label> Ваш пароль</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
            placeholder='Введите новый пароль'
            disabled={loading}
            value={password}
          />
          <button
            className='btn btn-primary'
            disabled={!password || loading || password.length < 6}>
            Отправить
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Загрузка</h4>
          ) : (
            <h4>Изменение пароля</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
