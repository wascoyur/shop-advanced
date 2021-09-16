import React from 'react';

const ShowPaymentInfo = ({ order }) => {
  return (
    <div className='row ml-3'>
      <div className='col'>OrderId: {order.paymentIntent.id}</div>
      <div className=' col'>
        Оплаченная сумма:{' '}
        {(order.paymentIntent.amount / 100).toLocaleString('ru-Ru', {
          style: 'currency',
          currency: 'RUB',
        })}
      </div>
      <div className='col bage - bg-primary text-white'>
        Статус оплаты: {order.orderStatus}
      </div>
      <div className='col'>
        Способ оплаты: {order.paymentIntent.payment_method_types[0]}
      </div>
      <div className='col'>
        Дата оплаты:{' '}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </div>
    </div>
  );
};

export default ShowPaymentInfo;
