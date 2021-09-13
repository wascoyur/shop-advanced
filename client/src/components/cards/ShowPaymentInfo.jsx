import React from 'react';

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <p>
        <span>OrderId: {order.paymentIntent.id}</span> <br />
        <span>
          Оплаченная сумма:{' '}
          {(order.paymentIntent.amount / 100).toLocaleString('ru-Ru', {
            style: 'currency',
            currency: 'RUB',
          })}
        </span>
        <br />
        <span>
          Способ оплаты: {order.paymentIntent.payment_method_types[0]}
        </span>
        <br />
        <span className='bage - bg-primary text-white'>
          Статус оплаты: {order.orderStatus}
        </span>
        <br />
        <span>
          Дата оплаты:{' '}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
