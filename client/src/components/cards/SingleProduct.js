import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import blank from '../../images/blank.png';

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;

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
      </div>
      <div className='col-md-5'>
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
          <Meta title={title} description={description} />
          <p>price/category/subs/shipping/brand/quantity avalible/sold </p>
        </Card>
      </div>
    </Fragment>
  );
};

export default SingleProduct;
