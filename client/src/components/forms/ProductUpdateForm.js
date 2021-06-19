import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
  categories,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
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
          defaultValue={title}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Описание</label>
        <input
          type='text'
          name='description'
          className='form-control'
          defaultValue={description}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Цена</label>
        <input
          type='number'
          name='price'
          className='form-control'
          defaultValue={price}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Доставка</label>
        <select
          name='shipping'
          className='form-control'
          onChange={handleChange}
          value={shipping === 'Да' ? 'Да' : 'Нет'}>
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
          onChange={handleChange}
          value={color}>
          <option>Выберите цвет</option>
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
          onChange={handleChange}
          value={brand}>
          <option>Выберите Брэнд</option>
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
          onChange={(e) => handleCategoryChange(e)}
          value={selectedCategory ? selectedCategory : category._id}>
          {/* <option>{category.name}</option> */}
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
        {/* {JSON.stringify(values)} */}
        <Select
          mode='multiple'
          allowclear='true'
          style={{ width: '100%' }}
          placeholder='Пожайлуста выберите'
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}>
          {subOptions.length &&
            subOptions.map((i) => (
              <Option value={i._id} key={i._id}>
                {i.name}
              </Option>
            ))}
        </Select>
      </div>

      <button className='btn btn-outline-info'>Сохранить</button>
      {/* {categories && categories.length} */}
    </form>
  );
};

export default ProductUpdateForm;
