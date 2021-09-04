import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCoupon,
  removeCoupon,
  createCoupon,
} from '../../../functions/coupon';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

const CreateCouponPage = () => {
  const [name, setName] = useState(Date.now());
  const [expiry, setExpiry] = useState(Date.now());
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`купон ${res.data.name} успешно создан  `);
      })
      .catch((err) => console.log('ошибка при создании купона', err));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Coupon</h4>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-muted'>Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className='form-group'>
              <label className='text-muted'>Скидка, %</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
                value={discount}
                autoFocus
                required
              />
            </div>
            <div className='form-group'>
              <label className='text-muted'>
                Дата окончания действия скидки
              </label>
              <DatePicker
                locale='ru'
                dateFormat='dd/MM/yy'
                className='form-control'
                selected={expiry}
                value={expiry}
                onChange={(date) => setExpiry(date)}
              />
            </div>
            <button className='btn btn-outline-primary'>Сохранить</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
