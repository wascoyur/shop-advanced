import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import { Col } from 'antd';
import { useParams } from 'react-router';
import { getProduct } from '../../../functions/product';

const initialState = {
  title: '',
  description: '',
  price: '',
  cetegories: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Samsung', 'Lenovo', 'Asus', 'Apple', 'Microsoft'],
  color: '',
  brand: '',
};

const ProductUpdate = ({ match }) => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  const { id } = match.params;
  // console.log(id);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(id)
      .then((product) => {
        console.log('product', product.data);
        setValues({ ...values, ...product.data });
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <Col md={10}>
          <h4>Редактирование товара</h4>
          {/* {JSON.stringify(values)} */}
        </Col>
      </div>
    </div>
  );
};
export default ProductUpdate;
