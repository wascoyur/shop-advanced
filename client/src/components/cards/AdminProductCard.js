import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import blank from '../../images/blank.png';

const { Meta } = Card;

const AdminProductCard = ({
  product: { title, images, description, _id },
  handleRemove,
  handleEdit,
}) => {
  return (
    <Fragment>
      {images && images.length ? (
        <Card
          cover={
            <img
              className='p-1'
              alt=''
              src={images[0].url}
              style={{ hight: '150px', objectFit: 'cover' }}
            />
          }
          actions={[
            <DeleteOutlined
              key='delete'
              className='text-warning'
              onClick={() => handleRemove(_id)}
            />,
            <Link to={`/admin/product/${_id}`}>
              <EditOutlined key='edit' className='text-danger' />
            </Link>,
          ]}>
          <Meta
            title={title}
            description={`${description && description.substring(0, 10)}...`}
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
            <DeleteOutlined
              key='delete'
              className='text-warning'
              onClick={() => handleRemove(_id)}
            />,
            <Link to={`/admin/product/${_id}`}>
              <EditOutlined key='edit' className='text-danger' />
            </Link>,
          ]}>
          <Meta
            title={title}
            description={`${description && description.substring(0, 10)}...`}
          />
        </Card>
      )}
    </Fragment>
  );
};

export default AdminProductCard;
