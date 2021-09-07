import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(process.env.REACT_APPSTRIPE_KEY);

const Payment = () => {
  return (
    <div>
      <div className='container p-5 text-center'>
        <h4>Завершите свою покупку</h4>
        <Elements stripe={promise}>
          <div className='col-md-8 offset-md-2'>
            <p>Проверка чекаут</p>
          </div>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
