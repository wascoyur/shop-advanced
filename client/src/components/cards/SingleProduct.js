import React, { Fragment } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;
  // const image=images[0]
  return (
    <Fragment>
      <div className='col-md-7'>image carousel</div>
      <div className='col-md-5'>
        {JSON.stringify(images)}
        <Card
          cover={
            <img
              className='p-1'
              alt=''
              // src={image}
              style={{ hight: '150px', objectFit: 'cover' }}
            />
          }
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
