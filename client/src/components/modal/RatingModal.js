import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Fragment>
      <div onClick={() => setModalVisible(true)}>
        <StarOutlined className='text-danger' />
        <br /> {user ? 'Оставить отзыв' : 'Авторизуйтесь чтобы оставить отзыв. '}
      </div>

      <Modal
        title='Оставьте отзыв'
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Спасибо за отзыв. Мы скоро его учтем');
        }}
        onCancel={() => setModalVisible(false)}>
        {children}
      </Modal>
    </Fragment>
  );
};

export default RatingModal;
