import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  applyCoupon,
  createCashOrderForUser,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from '../functions/user';
import { toast } from 'react-toastify';
import RectQuill from 'react-quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Payment from './Payment';

const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addresSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log('user cart', JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon('');
      toast.success('Корзина очищена. Можно продолжать покупки.');
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Адрес доставки установлен');
      }
    });
  };

  const showAddress = () => (
    <>
      <h4>Адрес доставки</h4>
      <br />
      <br />
      <ReactQuill theme='snow' onChange={setAddress} />
      <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
        Сохранить
      </button>
      <hr />
    </>
  );
  const showProductSummary = () => (
    <>
      Список товаров:{' '}
      {products.map((p, i) => {
        return (
          <div key={i}>
            {i + 1}. {p.product.title} ({p.color}) x {p.count} шт. ={' '}
            {p.product.price * p.count}
          </div>
        );
      })}{' '}
      <hr />
    </>
  );
  const applyDiscountCoupon = () => {
    console.log('coupon to back', coupon);
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({ type: 'COUPON_APPLIED', payload: true });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({ type: 'COUPON_APPLIED', payload: false });
      }
    });
  };

  const showApplyCoupon = () => (
    <>
      <input
        type='text'
        className='form-control'
        value={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError('');
        }}
      />

      <button onClick={applyDiscountCoupon} className='btn btn-primary mt-2'>
        применить
      </button>
    </>
  );

  const createCashOrder = () => {
    console.log('createCashOrder -->res.data');

    createCashOrderForUser(user.token, COD).then((res) =>
      console.log('createCashOrder -->res.data', res.data),
    );
  };
  const showCOD = () => (
    <button
      className='btn btn-primary'
      disabled={!addresSaved || !products.length}
      onClick={() => createCashOrder()}>
      Оплатить при получении
    </button>
  );
  const showPayButton = () => (
    <button
      className='btn btn-primary'
      disabled={!addresSaved || !products.length}
      onClick={() => history.push('/payment')}>
      Оплатить заказ
    </button>
  );
  return (
    <div className='row'>
      <div className='col-md-6'>
        {showAddress()}
        <h4>Есть купон?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className='bg-danger з-2'>{discountError}</p>}
      </div>
      <div className='col-md-6'>
        <h4>Итого:</h4>
        <h1>{total} руб.</h1>
        <hr />
        <p>
          Товаров, шт{' '}
          {products.reduce((count, p) => {
            return count + Number(p.count);
          }, 0)}{' '}
        </p>
        <hr />
        {showProductSummary()}

        <p>Итоговая сумма: {total} руб</p>
        {totalAfterDiscount > 0 && (
          <p className='bg-success p-2'>
            Купон использован. К оплате: {totalAfterDiscount} руб.{' '}
          </p>
        )}
        <div className='row'>
          {COD ? showCOD() : showPayButton()}
          {/* <div className='col-md-6'></div> */}
          <div className='col-md-6'>
            <button
              className='btn btn-primary'
              onClick={emptyCart}
              disabled={!products.length}>
              Очистить корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
