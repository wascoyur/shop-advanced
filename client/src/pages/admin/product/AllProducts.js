import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount, removeProduct } from '../../../functions/product';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = (id) => {
    if (window.confirm('Точно удалить?')) {
      // console.log('remove:', id);
      removeProduct(id, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} удален`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const handleEdit = (id) => {
    // console.log('edit', id);
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
              <div className='col-md-4 pb-4' key={p._id}>
                <AdminProductCard
                  product={p}
                  handleRemove={handleRemove}
                  handleEdit={handleEdit}
                />
              </div>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
