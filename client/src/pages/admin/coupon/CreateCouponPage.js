import { DeleteOutlined } from '@ant-design/icons';
import ru from 'date-fns/locale/ru';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from '../../../functions/coupon';

registerLocale('ru', ru);

const CreateCouponPage = () => {
  const [name, setName] = useState(
    new Date(Date.now()).toLocaleTimeString('ru-RU'),
  );
  const [expiry, setExpiry] = useState(Date.now());
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState('');
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons().then((res) => setCoupons(res.data));
  }, []);

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        loadAllCoupons();
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`купон ${res.data.name} успешно создан  `);
      })
      .catch((err) => console.log('ошибка при создании купона', err));
  };
  const handleRemove = (couponId) => {
    if (window.confirm('Удалить?')) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((resp) => {
          loadAllCoupons();
          setLoading(false);
          toast.error(`купон ${resp.data.name} удален`);
        })
        .catch((err) => console.log('err:', err));
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? (
            <h4 className='text-danger'>Загрузка данных...</h4>
          ) : (
            <h4>Количество купонов: {coupons.length}</h4>
          )}
          <hr />
          <h4>Купоны</h4>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-muted'>Тема купона</label>
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
          <hr />
          <table className='table table-bordered'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Имя</th>
                <th scope='col'>Дата окончания</th>
                <th scope='col'>Размер скидки</th>
                <th scope='col'>Операции</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount} %</td>
                  <td>
                    <DeleteOutlined
                      className='text-danger pointer'
                      onClick={() => handleRemove(c._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
