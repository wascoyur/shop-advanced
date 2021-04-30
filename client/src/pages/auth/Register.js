import React, { useState, useEffect} from 'react';
import {useSelector, } from 'react-redux'
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({history}) => {
  const [email, setEmail] = useState('');
  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    if(user && user.token) history.push('/')
  }, [user, history])
  
const handleSubmit = async e => {
    e.preventDefault();

    const config = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      // This must be true.
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Для завершения регистрации, ссылка отправлена вам на почту ${email}. Пройдите по ссылке`);
    window.localStorage.setItem('emailForRegistration', email)
    setEmail('')
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        value={email}
        placeholder='Введите адрес электроной почты'
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <button type='submit' className='btn btn-primary'>
        Зарегистрировать: {email}
      </button>
    </form>
  );
  
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Регистрация</h4>
          {registerForm()}

        </div>
      </div>
    </div>
  );
};

export default Register;
