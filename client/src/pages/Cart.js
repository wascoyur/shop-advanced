import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  const saveOrderToDb = () => {};

  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <h4>Корзина / {cart.length} товаров</h4>
        {/* {JSON.stringify(cart)} */}
      </div>
      <div className='row'>
        <div className='col-md-8'>
          {!cart.length ? (
            <p>
              Корзина пуста.<Link to='/shop'>Продолжить покупки</Link>
            </p>
          ) : (
            'товары в корзине'
          )}
        </div>
        <div className='col-md-4'>
          <h4>Суммарные расходы</h4>
          <hr />
          <p>Товары:</p>
          {cart.map((c, i) => {
            return (
              <div key={i}>
                <p>
                  {c.title} х {c.count} шт. = {c.price * c.count} руб.
                </p>
              </div>
            );
          })}
          <hr />
          Итого: <b>{getTotal()} руб</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              disabled={!cart.length}
              className='btn btn-sm btn-primary mt-2'>
              Оплатить
            </button>
          ) : (
            <button className='btn btn-sm btn-primary mt-2'>
              <Link to={{ pathname: '/login', state: { from: 'cart' } }}>
                Войти чтобы Оплатить
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
