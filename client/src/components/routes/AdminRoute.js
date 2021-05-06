import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import React, { useEffect, useState } from 'react';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/authcreateUpdateUser';

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          // console.log('currAdm:', res);
          setOk(true);
        })
        .catch((err) => {
          console.log('adm route err:', err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
