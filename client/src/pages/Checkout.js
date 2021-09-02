import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { emptyUserCart, getUserCart, saveUserAddress } from '../functions/user';
import { toast } from 'react-toastify'
import RectQuill from'react-quill'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css' 

const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('')
  const [addresSaved, setAddressSaved]=useState(false)

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
      toast.success('Корзина очищена. Можно продолжать покупки.');
    });
  };
  
  const saveAddressToDb = ( ) => {
    saveUserAddress(user.token, address).then(res => {
       if (res.data.ok) {
         setAddressSaved(true)
         toast.success('Адрес доставки установлен')
       }
     })
    
  } 

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Адрес доставки</h4>
        <br />
        <br />
        <ReactQuill theme='snow' onChange={setAddress}/>
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>Сохранить</button>
        <hr />
        <h4>Есть купон?</h4>
        <br />
        coupon input
      </div>
      <div className='col-md-6'>
        <h4>Итого:</h4>
        <h1>{total} руб.</h1>
        {/* {JSON.stringify(products)} */}
        <hr />
        <p>
          Товаров, шт{' '}
          
          {products.reduce((count, p) => {
            return count + Number(p.count);
          }, 0)}{' '}
        </p>
        <hr />
        
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
        <p>Итоговая сумма: {total} руб</p>
        <div className='row'>
          <div className='col-md-6'>
            <button className='btn btn-primary' disabled={!addresSaved || !products.length}>Оплатить заказ</button>
          </div>
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
