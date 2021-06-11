import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount } from '../../functions/product';
import { Spin, Space } from 'antd';
import { Row, Col } from 'antd';

const AdminDashboard = () => {
  const [products, setProducts] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <Row justify='center'>
          <Col>Admin Dashboard</Col>
        </Row>

        {loading ? (
          <Space size='large'>
            <Spin size='large'></Spin>
          </Space>
        ) : (
          <Col>{JSON.stringify(products)}</Col>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
