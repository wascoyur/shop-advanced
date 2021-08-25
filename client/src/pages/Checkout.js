import React from 'react';

const Checkout = () => {
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
