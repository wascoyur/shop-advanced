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

  const showOrderInTable = (order) => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Название</th>
          <th scope='col'>Цена</th>
          <th scope='col'>Бренд</th>
          <th scope='col'>Цвет</th>
          <th scope='col'>Количество</th>
          <th scope='col'>Способ доставки</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>{p.product.shipping}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
