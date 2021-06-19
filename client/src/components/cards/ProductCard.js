import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    // <div>{product.title}</div>
    <Card
      cover={
        <img
          className='p-1'
          alt=''
          src={product.images[0].url}
          style={{ hight: '150px', objectFit: 'cover' }}
        />
      }
      actions={[
        <>
          <ShoppingCartOutlined
            key='delete'
            /* className='text-warning' */
            onClick={() => {}}
          />
          <br />
          Положить в корзину
        </>,
        <Link to={`/product/${product._id}`}>
          <EyeOutlined key='edit' /*  className='text-danger' */ />
          <br />
          Подробнее..
        </Link>,
      ]}>
      <Meta
        title={product.title}
        description={`${
          product.description && product.description.substring(0, 10)
        }...`}
      />
    </Card>
  );
};

export default ProductCard;
