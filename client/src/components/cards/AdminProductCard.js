import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const AdminProductCard = ({
  product: { title, images, description, _id },
  handleRemove,
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
        <EditOutlined key='edit' className='text-danger' />,
      ]}>
      <Meta
        title={title}
        description={`${description && description.substring(0, 10)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
