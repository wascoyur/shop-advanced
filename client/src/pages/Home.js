import React, { useEffect, useState } from 'react';
import { getProductsByCount } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
    });
    setLoading(false);
  };

  return (
    <div>
      <div className='jumbotron'>
        {loading ? <h4>Загружается...</h4> : <p>Все товары</p>}
        {/* {JSON.stringify(products)} */}{' '}
      </div>
      <div className='row'>
        {products.map((product) => (
          <div className='col-md-4' key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
