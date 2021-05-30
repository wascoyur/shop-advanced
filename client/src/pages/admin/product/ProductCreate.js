import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';

const initialState = {
  title: '',
  description: '',
  price: '',
  cetegories: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Samsung', 'Lenovo', 'Asus', 'Apple', 'Microsoft'],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error(error.response.data);
        }
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Создание продукта</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Название</label>
              <input
                type='text'
                name='title'
                className='form-control'
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Описание</label>
              <input
                type='text'
                name='description'
                className='form-control'
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Цена</label>
              <input
                type='number'
                name='price'
                className='form-control'
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Доставка</label>
              <select
                name='shipping'
                className='form-control'
                onChange={handleChange}>
                <option value='Нет'>Нет</option>
                <option value='Да'>Да</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Количество</label>
              <input
                type='number'
                name='quantity'
                className='form-control'
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Цвет</label>
              <select
                name='color'
                className='form-control'
                onChange={handleChange}>
                <option>Выберите значение</option>
                {colors.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label>Брэнд</label>
              <select
                name='brand'
                className='form-control'
                onChange={handleChange}>
                <option>Выберите значение</option>
                {brands.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <button className='btn btn-outline-info'>Сохранить</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;
