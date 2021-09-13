import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log('orders:', JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };
  useEffect(() => {
    loadUserOrders();
  }, []);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>user History page</div>
        {orders.length}
      </div>
    </div>
  );
};

export default History;
