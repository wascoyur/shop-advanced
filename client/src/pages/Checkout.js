import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart } from '../functions/user';

const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log('user cart', JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAdressToDb = () => {};
  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Адрес доставки</h4>
        <br />
        <br />
        text
        <button className='btn btn-primary mt-2' onClick={saveAdressToDb}>
          Сохранить
        </button>
        <hr />
        <h4>Есть купон?</h4>
        <br />
        coupon input
      </div>
      <div className='col-md-6'>
        <h4>Итого:</h4>
        <h1>{total} руб.</h1>
        {JSON.stringify(products)}
        <hr />
        <p>Товаров х </p>
        <hr />
        <p>List products</p>
        <hr />
        <p>Summary total: `${} руб`</p>
        <div className='row'>
          <div className='col-md-6'>
            <button className='btn btn-primary'>Оплатить заказ</button>
          </div>
          <div className='col-md-6'>
            <button className='btn btn-primary'>Очистить корзину</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
