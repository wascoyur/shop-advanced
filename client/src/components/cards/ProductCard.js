import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { showAverege } from '../../functions/rating';
import blank from '../../images/blank.png';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Fragment>
      {product && product.raitings && product.raitings.length > 0 ? (
        showAverege(product)
      ) : (
        <div className='text-center pt-1 pb-3'>Нет оценок</div>
      )}
      {product.images && product.images.length ? (
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
            title={`${product.title} - ${product.price}р.`}
            description={`${
              product.description && product.description.substring(0, 10)
            }...`}
          />
        </Card>
      ) : (
        <Card
          cover={
            <img
              className='p-1'
              alt=''
              src={blank}
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
            title={`${product.title} - цена: ${product.price}`}
            description={`${
              product.description && product.description.substring(0, 10)
            }...`}
          />
        </Card>
      )}
    </Fragment>
  );
};

export default ProductCard;
