import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import React from 'react'
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? (
    <Route {...rest} render={() => children}
    />
  ) : (
    <LoadingToRedirect/>
  );
};

export default UserRoute;
