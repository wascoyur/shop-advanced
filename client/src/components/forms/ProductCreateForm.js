import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    category,
    categories,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
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
        <select name='color' className='form-control' onChange={handleChange}>
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
        <select name='brand' className='form-control' onChange={handleChange}>
          <option>Выберите значение</option>
          {brands.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Категория товара</label>
        <select
          name='category'
          className='form-control'
          onChange={(e) => handleCategoryChange(e)}>
          <option>Выберите категорию товара</option>
          {categories &&
            categories.length > 0 &&
            categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Подгатегории</label>
        <Select
          mode='multiple'
          allowclear='true'
          style={{ width: '100%' }}
          placeholder='Пожайлуста выберите'
          value={subs}
          onChange={(value) => setValues({ ...values, subs: value })}>
          <Option value='one'>Subs1</Option>
          <Option value='two'>Subs2</Option>
        </Select>
      </div>
      {JSON.stringify(subs)}
      <button className='btn btn-outline-info'>Сохранить</button>
      {/* {categories && categories.length} */}
    </form>
  );
};

export default ProductCreateForm;
