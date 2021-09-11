import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import { createOrder, emptyUserCart } from '../functions/user';

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, couponReducer: coupon } = useSelector((state) => ({
    ...state,
  }));
  const [succsed, setSuccsed] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotal, setCartTotal] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState('');
  const [payable, setPayable] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log('create payment intent:', res.data);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`При оплате произошла ошибка: ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('cart');
          }
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          });
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false,
          });
          emptyUserCart(user.token);
        }
      });
      setError(null);
      setProcessing(false);
      setSuccsed(true);
    }
  };
  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error);
  };
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
      {!succsed && (
        <div>
          {' '}
          {coupon && totalAfterDiscount !== undefined ? (
            <p className='alert alert-success'>{`Сумма после применения скидки: ${totalAfterDiscount} руб.`}</p>
          ) : (
            <p className='alert alert-danger'>Скидки не использованы</p>
          )}
        </div>
      )}
      <Card
        actions={[
          <>
            <DollarOutlined className='text-info' /> Сумма покупки: {cartTotal}{' '}
            руб
          </>,
          <>
            <CheckOutlined className='text-info' /> Сумма к оплате:{' '}
            {(payable / 100).toFixed(2)} руб
          </>,
        ]}
      />
      <form className='stripe-form' id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />

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
        <br />
        {error && (
          <div className='card-error' role='alert'>
            {error.message}
          </div>
        )}
        <p className={succsed ? 'result-message' : 'result-message-hidden'}>
          Оплата успешна{' '}
          <Link to={'user/history'}>Посмотреть в истории покупок </Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
