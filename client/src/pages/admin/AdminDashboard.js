import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount } from '../../functions/product';
import { Spin, Space } from 'antd';
import { Row, Col } from 'antd';
import AdminProductCard from '../../components/cards/AdminProductCard';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
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

        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Загрузка...</h4>
          ) : (
            <Row justify='center'>
              <h4>Все товары</h4>
            </Row>
          )}
          <Row>
            {products.map((p) => (
              <Col md={12} key={p._id}>
                <AdminProductCard product={p} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
