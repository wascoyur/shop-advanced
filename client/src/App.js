import React, { useEffect, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import SideDrawer from './components/drawer/SideDrawer';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/authcreateUpdateUser';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoutes';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import ProductPage from './pages/ProductPage';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/subs/SubHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            // console.log(res);
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <SideDrawer/>
        <ToastContainer />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/register/complete' component={RegisterComplete} />
          <Route exact path='/forgot/password' component={ForgotPassword} />
          <Route exact path='/product/:slug' component={ProductPage} />
          <Route exact path='/cart' component={Cart} />
          <UserRoute exact path='/user/history' component={History} />
          <UserRoute exact path='/user/password' component={Password} />
          <UserRoute exact path='/user/wishlist' component={Wishlist} />
          <AdminRoute
            exact
            path='/admin/dashboard'
            component={AdminDashboard}
          />
          <AdminRoute exact path='/admin/category' component={CategoryCreate} />
          <AdminRoute exact path='/admin/sub' component={SubCreate} />
          <AdminRoute
            exact
            path='/admin/category/:slug'
            component={CategoryUpdate}
          />
          <AdminRoute exact path='/admin/sub/:slug' component={SubUpdate} />
          {/* <AdminRoute exact path='/admin/products' component={ProductCreate} /> */}
          <AdminRoute exact path='/admin/product' component={ProductCreate} />
          <AdminRoute exact path='/admin/products' component={AllProducts} />
          <AdminRoute
            exact
            path='/admin/product/:id'
            component={ProductUpdate}
          />
          <Route exact path='/category/:slug' component={CategoryHome} />
          <Route exact path='/sub/:slug' component={SubHome} />
          <Route exact path='/shop' component={Shop} />
        </Switch>
    </Fragment>
  );
};

export default App;
