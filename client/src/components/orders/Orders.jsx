import React from 'react';
import ShoPaymentInfo from '../cards/ShowPaymentInfo';

const Orders = ({ orders, handleStatusChange }) => {
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
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className='row'>
          <div className='row'>
            <div className='col-md-2 mt-2 mb-3 mr-4'>Статус доставки</div>
            <div className='col md-2'>
              <select
                defaultValue={order.orderStatus}
                name='status'
                className='form-control'
                onChange={(e) => {
                  handleStatusChange(order._id, e.target.value);
                }}>
                <option value='Not Processing'>Not Processing</option>
                <option value='Processing'>Processing</option>
                <option value='Dispatched'>Dispatched</option>
                <option value='Cencelled'>Cencelled</option>
                <option value='Completed'>Completed</option>
              </select>{' '}
            </div>
          </div>
          <ShoPaymentInfo order={order} />
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
