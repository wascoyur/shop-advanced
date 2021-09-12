import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { showAverege } from '../../functions/rating';
import blank from '../../images/blank.png';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [toltip, setTooltip] = useState('Нажмите для добавления в корзину');

  // const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      if (product.quantity < 1) {
        toast.warning('Товар закончился на складе');
        return;
      }
      cart.push({ ...product, count: 1 });
    }
    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem('cart', JSON.stringify(unique));
    setTooltip('Уже добавлено в корзину');

    dispatch({
      type: 'ADD_TO_CART',
      payload: unique,
    });

    dispatch({
      type: 'SET_VISIBLE',
      payload: true,
    });
  };

  return (
    <Fragment>
      {product && product.raitings && product.raitings.length > 0 ? (
        showAverege(product)
      ) : (
        <div className='text-center pt-1 pb-3'>Нет оценок</div>
      )}

      <Card
        cover={
          <img
            className='p-1'
            alt=''
            src={
              product.images && product.images.length > 0
                ? product.images[0].url
                : blank
            }
            style={{ hight: '150px', objectFit: 'cover' }}
          />
        }
        actions={[
          <Tooltip title={toltip}>
            <a onClick={handleAddToCart} disabled={true}>
              <ShoppingCartOutlined className='text-danger' />
              <br />
              {product.quantity < 1 ? (
                <p>Товара нет на складе</p>
              ) : (
                <p>Положить в корзину</p>
              )}
            </a>
          </Tooltip>,
          <Link to={`/product/${product._id}`}>
            <EyeOutlined key='edit' className='text-warning' />
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
    </Fragment>
  );
};

export default ProductCard;
