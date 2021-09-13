import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      // console.log('orders:', JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };
  useEffect(() => {
    loadUserOrders();
  }, []);

  const showOrderInTable = (order) => <p>товары </p>;

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className='m-5 p-3 card'>
        <p>show payment info</p>
        {showOrderInTable(order)}
        <div className='row'>
          <div className='col'>
            <p>PDF download</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>

        <div className='col text-center'>
          <h4 className='col '>
            {orders.length
              ? 'Ваши оплаченные покупки'
              : 'Нет оплаченных покупок'}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
