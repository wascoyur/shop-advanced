import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import React from 'react'

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? (
    <Route {...rest} render={() => children}
    />
  ) : (
    <h1 className='text-danger'>Нужно залогиниться</h1>
  );
};

export default UserRoute;
