import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [succsed, setSuccsed] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log('create payment intent:', res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (e) => {};
  const handleChange = async (e) => {};
  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return (
    <>
      <form className='stripe-form' id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
      </form>
      <button
        className='stripe-button'
        disabled={processing || disabled || succsed}>
        <span id='button-text'>
          {processing ? (
            <div className='spinner' id='spinner'></div>
          ) : (
            'Оплатить'
          )}
        </span>
      </button>
    </>
  );
};

export default StripeCheckout;
