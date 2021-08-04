import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Menu, Radio, Slider, Space } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/forms/Star';
import { getCategories } from '../functions/category';
import {
  fetchProductsByFilter,
  getProductsByCount,
  fetchBrands,
} from '../functions/product';
import { getSubs } from '../functions/sub';

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
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState([]);
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [shippingMethod, setShippingMethod] = useState([]);

  useEffect(() => {
    loadAllProducts();
    getCategories().then((c) => setCategories(c.data));
    getSubs().then((s) => setSubs(s.data));
    getAttributes('brand').then((brands) => setBrands(brands));
    getAttributes('color').then((colors) => setColors(colors));
    getAttributes('shipping').then((shipping) => setShippingMethods(shipping));
    // getAttributes('color');
    // getAttributes('shipping');
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
      getAttributes('brand');
      setLoading(false);
    });
  };

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const resetFilters = () => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setSub('');
    setStar('');
    setBrand('');
    setColor('');
    setShippingMethod('')
  };

  const handleSlider = (value) => {
    resetFilters();
    setPrice(value);
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
    resetFilters();

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

  const handleStarClick = (num) => {
    resetFilters();
    setStar(num);
    fetchProducts({ stars: num });
    // console.log('e', num);
  };

  const showStars = () => {
    let starsBlock = [];
    for (let i = 5; i > 0; i--) {
      starsBlock.push(
        <Menu.Item key={`s${i}`}>
          <Star starClick={handleStarClick} numberOfStars={i} />
        </Menu.Item>,
      );
    }
    return starsBlock;
  };

  const handleSub = (sub) => {
    resetFilters();
    setSub(sub);
    fetchProducts({ sub: sub.key });
  };

  const showSubs = () =>
    subs.map((c) => (
      <Menu.Item
        className='p-1 m-1 badge badge-secondary'
        style={{ cursor: 'pointer', display: 'inline' }}
        key={c._id}
        onClick={(c) => {
          handleSub(c);
        }}>
        {c.name}
      </Menu.Item>
    ));

  const getAttributes = useCallback(async (attribute) => {
    const { data: fetchattributes } = await fetchBrands({
      attribute: attribute,
    });
    // console.log('fetchbrands', fetchattributes);
    // debugger;
    if (fetchattributes && fetchattributes.length > 0) {
      return fetchattributes;
    }
  }, []);

  const handleBrands = (e) => {
    resetFilters();
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () => {
    return brands.map((c) => (
      <Radio
        style={{ display: 'flex' }}
        key={c}
        value={c}
        name={c}
        checked={c === brand}
        onChange={handleBrands}
        className='pb-1 pl-4 pr-4'>
        {c}
      </Radio>
    ));
  };

  
  const handleColors = (e) => {
    resetFilters();
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const showColors = () => {
    return colors.map((c) => (
      <Radio
        style={{ display: 'flex' }}
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColors}
        className='pb-1 pl-4 pr-4'>
        {c}
      </Radio>
    ));
  };

  const getShippngMethod = () => {};
  const handleShippingMethods = (e) => {
    resetFilters()
    setShippingMethod(e.target.value)
    fetchProducts({shipping:e.target.value})
   };
  
  const showShippingMethods = () => {
    return shippingMethods.map((s) => (
      <Radio
        style={{ display: 'flex' }}
        key={s}
        value={s}
        name={s}
        checked={s === shippingMethod}
        onChange={handleShippingMethods}
        className='pb-1 pl-4 pr-4'>
        {s}
      </Radio>
    ));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Поиск/фильтр</h4>
          <Menu
            mode='inline'
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}>
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

            <SubMenu
              title={
                <span className='h6'>
                  <StarOutlined /> Рейтинг
                </span>
              }
              key='3'>
              {showStars()}
            </SubMenu>
            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Подкатегории
                </span>
              }>
              {showSubs()}
            </SubMenu>
            <SubMenu
              key='5'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Брэнды
                </span>
              }>
              {showBrands()}
            </SubMenu>
            <SubMenu
              key='6'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Цвет
                </span>
              }>
              {showColors()}
            </SubMenu>
            <SubMenu
              key='7'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Доставка
                </span>
              }>
              {showShippingMethods()}
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
            {products &&
              products.map((p) => (
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
