import React, { useEffect, useState } from 'react';
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const [price, setPrice] = useState([0, 0]);
  const { SubMenu, ItemGroup } = Menu;
  const [ok, setOk] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    //console.log('input:', text);
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    // console.log('ok to req');
    fetchProducts({ price });
  }, [ok]);

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

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(value);
    // console.log('price:',value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Поиск/фильтр</h4>
          <Menu mode='inline' defaultOpenKeys={['1', '2']}>
            <SubMenu
              key=' '
              title={
                <span className='h6'>
                  <DollarOutlined /> Цена
                </span>
              }>
              <Slider
                range
                max='10000'
                className='ml-4 mr-4 '
                tipFormatter={(v) => `Руб ${v}`}
                value={price}
                onChange={handleSlider}
              />
            </SubMenu>
          </Menu>
        </div>
        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Загрузка...</h4>
          ) : (
            <h4 className='text-danger pt-2'>Товары</h4>
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
