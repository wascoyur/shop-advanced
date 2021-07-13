import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';
import { Menu, Slider, Space } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { getCategories } from '../functions/category';
import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../functions/product';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const [price, setPrice] = useState([0, 0]);
  const { SubMenu, ItemGroup } = Menu;
  const [ok, setOk] = useState(false);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  useEffect(() => {
    loadAllProducts();
    getCategories().then((c) => setCategories(c.data));
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
  }, [ok, price]);

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
    setCategoryIds([])
    setPrice(value);
    // console.log('price:',value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const showCategories = () =>
    categories.map((c) => (
      <Menu.Item
        key={c._id}
        style={{ marginTop: '-0.2rem', marginBottom: '-0.1rem' }}>
        <Space size='small'>
          <Checkbox
            onChange={handleCheck}
            name='category'
            valueCategoryId={c._id}
            checked={categoryIds.includes(c._id)}
          />
          {c.name}
        </Space>
      </Menu.Item>
    ));

  const handleCheck = (e) => {
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setPrice([0, 0]);

    let inTheState = [...categoryIds];
    let justChecked = e.target.valueCategoryId;
    let foundInTheState = inTheState.indexOf(justChecked);
    // debugger
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    // debugger
    fetchProducts({ category: inTheState });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Поиск/фильтр</h4>
          <Menu mode='inline' defaultOpenKeys={['1', '2']}>
            <SubMenu
              key='1'
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

            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Категории
                </span>
              }>
              {showCategories()}
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
