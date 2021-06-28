import { StarOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();
  let params = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      // console.log('params.slug', params.slug);
      
      history.push({
        pathname: '/login',
        state: { from: `/product/${params.slug}` },
      });
    }
  };

  return (
    <Fragment>
      <div onClick={() => handleModal()}>
        <StarOutlined className='text-danger' />
        <br />{' '}
        {user ? 'Оставить отзыв' : 'Авторизуйтесь чтобы оставить отзыв. '}
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
