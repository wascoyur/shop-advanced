import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Tabs, Tooltip } from 'antd';
import React, { Fragment, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { showAverege } from '../../functions/rating';
import blank from '../../images/blank.png';
import RatingModal from '../modal/RatingModal';
import ProductListItem from './ProductListItem';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../../functions/user';
import { toast } from 'react-toastify';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, _id } = product;
  const [toltip, setTooltip] = useState('Нажмите для добавления в корзину');
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  let history = useHistory();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
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

  const handleToWishList = (e) => {
    // debugger;
    // e.prevent.default();
    addToWishList(_id, user.token).then((res) => {
      console.log('ДоТовар добавлен в список желаний', res.data);

      toast.success('Товар добавлен в список желаний');
      history.push('/user/wishlist');
    });
  };

  return (
    <Fragment>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
            {images &&
              images.map((i) => <img src={i.url} key={i.public_id} alt='' />)}
          </Carousel>
        ) : (
          <Fragment>
            <Card
              cover={
                <img
                  className='p-1'
                  alt=''
                  src={blank}
                  style={{ hight: '150px', objectFit: 'cover' }}
                />
              }></Card>
          </Fragment>
        )}

        <Tabs type='card'>
          <TabPane tab='Описание' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='Дополнительная информация о товаре' key='2'>
            Позвоните нам для уточнения вопроса 8(800)254-45-45
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        {product && product.raitings && product.raitings.length > 0 ? (
          showAverege(product)
        ) : (
          <div className='text-center pt-1 pb-3'>Нет оценок</div>
        )}
        <Card
          actions={[
            <Tooltip title={toltip} onClick={handleAddToCart}>
              <ShoppingCartOutlined className='text-succsess' />
              <br />
              Добавить в корзину
            </Tooltip>,

            <a onClick={(e) => handleToWishList(e)}>
              <HeartOutlined className='text-info' />
              <br />
              Добавить в мои желания
            </a>,

            <RatingModal>
              <StarRatings
                name={_id}
                starDimension={'1.5rem'}
                changeRating={onStarClick}
                rating={star}
                numberOfStars={5}
                starRatedColor={'yellow'}
                isSelectable='true'
              />
            </RatingModal>,
          ]}>
          <ProductListItem product={product} />
        </Card>
      </div>
    </Fragment>
  );
};

export default SingleProduct;
