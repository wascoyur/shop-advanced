import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdminProductCard = ({
  product: { title, images, description, _id },
  handleRemove,
  handleEdit,
}) => {
  return (
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
  );
};

export default AdminProductCard;
