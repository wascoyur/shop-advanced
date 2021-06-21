import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Tabs } from 'antd';
import React, { Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import blank from '../../images/blank.png';
import ProductListItem from './ProductListItem';

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, description, images } = product;

  return (
    <Fragment>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                className='p-1'
                alt=''
                src={blank}
                style={{ hight: '150px', objectFit: 'cover' }}
              />
            }></Card>
        )}

        <Tabs type='card' >
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
        <Card
          actions={[
            <Fragment>
              <ShoppingCartOutlined className='text-succsess' />
              <br />
              Добавить в корзину
            </Fragment>,
            <Link to='/'>
              <HeartOutlined className='text-info' />
              <br />
              Добавить в мои желания
            </Link>,
          ]}>
          <ProductListItem product={product} />
        </Card>
      </div>
    </Fragment>
  );
};

export default SingleProduct;
