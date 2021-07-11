import React, { useEffect, useState } from 'react';
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    //console.log('input:', text);
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return ()=>clearTimeout(delayed )
  }, [text]);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>Поиск/фильтр</div>
        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Загрузка...</h4>
          ) : (
            <h4 className='text-danger'>Товары</h4>
          )}
          {products.length < 1 && <p>Товары не найдены</p>}
          <div className='row pb-5'>
            {products.map((p) => (
              <div key={p._id} className='col-md-4 mt-3'>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
