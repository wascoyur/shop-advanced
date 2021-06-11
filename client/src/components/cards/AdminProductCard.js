import React from 'react';
import { Card } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const AdminProductCard = ({ product: { title, images, description } }) => {
  return (
    <Card
      cover={
        <img
          className='m-2'
          alt=''
          src={images[0].url}
          style={{ hight: '150px', objectFit: 'cover' }}
        />
      }>
      <Meta
        title={title}
        description={description}
        actions={[
          <SettingOutlined key='setting' />,
          <EditOutlined key='edit' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}
      />
    </Card>
  );
};

export default AdminProductCard;
