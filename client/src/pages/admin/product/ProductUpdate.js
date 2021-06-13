import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import { Col } from 'antd';
import { useParams } from 'react-router';

const ProductUpdate = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { id } = match.params;
  console.log(id);

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
