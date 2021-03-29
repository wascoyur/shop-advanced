import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { Switch, Route } from 'react-router-dom';
import Header from './components/nav/Header';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from './pages/auth/RegisterCoplete';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token:idTokenResult.token
          }
        })
      }
    })
    return ()=> unsubscribe()
  }, []);
  return (
    <Fragment>
      <Header />
      <ToastContainer />

      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/register/complete' component={RegisterComplete} exact />
      </Switch>
    </Fragment>
  );
};

export default App;
