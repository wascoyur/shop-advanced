import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div>
      <div className='container p-5 text-center'>
        <h4>Завершите свою покупку</h4>
        <Elements stripe={promise}>
          <div className='col-md-8 offset-md-2'>
            <StripeCheckout />
          </div>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
