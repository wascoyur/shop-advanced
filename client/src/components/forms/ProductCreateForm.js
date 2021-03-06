import { Select } from 'antd';
import React from 'react';

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
    categories,
    subs,
    quantity,
    colors,
    brands,
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
          defaultValue='Самовывоз'
          className='form-control'
          onChange={handleChange}>
          <option value='СДЭК'>СДЭК</option>
          <option value='Почта Росии'>Почта Росии</option>
          <option value='Самовывоз'>Самовывоз</option>
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
      {showSub && (
        <div>
          <label>Подгатегории</label>
          <Select
            mode='multiple'
            allowclear='true'
            style={{ width: '100%' }}
            placeholder='Пожайлуста выберите'
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}>
            {subOptions.length &&
              subOptions.map((i) => (
                <Option value={i._id} key={i._id}>
                  {i.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <button className='btn btn-outline-info'>Сохранить</button>
      {/* {categories && categories.length} */}
    </form>
  );
};

export default ProductCreateForm;
