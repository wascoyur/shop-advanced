import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import { Col } from 'antd';

const ProductUpdate = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log('id: ', match.params);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <Col md={10}>
          <h4>Редактирование товара</h4>
        </Col>
      </div>
    </div>
  );
};
export default ProductUpdate;
