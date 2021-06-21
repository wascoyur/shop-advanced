import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    quantity,
    updatedAt,
    createdAt,
    brand,
    sold,
  } = product;
  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        Цена
        <span className='label label-default label-pill pull-xs-right'>
          {price}
        </span>
      </li>
      {category && (
        <li className='list-group-item'>
          Категория
          <Link
            to={`/category/${category.slug}`}
            className='label label-default label-pill pull-xs-right'>
            {category.name}
          </Link>
        </li>
      )}
      <li className='list-group-item'>
        Подкатегории
        {subs &&
          subs.map((i) => (
            <Link
              to={`/sub/${i.slug}`}
              className='label label-default label-pill pull-xs-right'
              key={i._id}>
              {i.name}
            </Link>
          ))}
      </li>
      <li className='list-group-item'>
        Доставка
        <span className='label label-default label-pill pull-xs-right'>
          {shipping}
        </span>
      </li>
      <li className='list-group-item'>
        Цвет
        <span className='label label-default label-pill pull-xs-right'>
          {color}
        </span>
      </li>
      <li className='list-group-item'>
        Производитель
        <span className='label label-default label-pill pull-xs-right'>
          {brand}
        </span>
      </li>
      <li className='list-group-item'>
        Количество на складе
        <span className='label label-default label-pill pull-xs-right'>
          {quantity}
        </span>
      </li>
      <li className='list-group-item'>
        Дата поступления
        <span className='label label-default label-pill pull-xs-right'>
          {createdAt}
        </span>
      </li>
      <li className='list-group-item'>
        Дата обновления
        <span className='label label-default label-pill pull-xs-right'>
          {updatedAt}
        </span>
      </li>
      <li className='list-group-item'>
        Продано
        <span className='label label-default label-pill pull-xs-right'>
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItem;
