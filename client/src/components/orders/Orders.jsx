import React from 'react';
import ShoPaymentInfo from '../cards/ShowPaymentInfo';

const Orders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className='row pb-5'>
          <ShoPaymentInfo order={order} />
          <div className='row ml-5'>
            <div className='col-md-4'>Статус доставки</div>
            <div className='col-md-8 '>
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
        </div>
      ))}
    </>
  );
};

export default Orders;
