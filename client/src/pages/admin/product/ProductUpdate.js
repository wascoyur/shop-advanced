import { LoadingOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories, getCategorySubs } from '../../../functions/category';
import { getProduct } from '../../../functions/product';
import { updateProduct } from '../../../functions/product';
import { toast } from 'react-toastify';

const initialState = {
  title: '',
  description: '',
  price: '',
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
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { id } = match.params;
  // console.log(id);

  const loadProduct = useCallback(() => {
    getProduct(id)
      .then((product) => {
        // console.log('product', product.data);
        setValues({ ...values, ...product.data });

        getCategorySubs(product.data.category._id).then((res) => {
          setSubOptions(res.data);
        });

        let arr = [];
        product.data.subs.map((s) => arr.push(s._id));
        setArrayOfSubs((prev) => arr);
      })
      .catch((err) => console.log('err', err));
  }, [id]);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [loadProduct]);

  const loadCategories = () => {
    getCategories().then((item) => {
      setCategories(item.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProduct(id, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} обновлен`);
      })
      .catch((err) => {
        console.log('err', err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <Col md={10}>
          {loading ? (
            <LoadingOutlined className='text-danger h1' />
          ) : (
            <h4>Редактирование товара</h4>
          )}

          {/* {JSON.stringify(arrayOfSubs)} */}
          <div className='p-3'>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            values={values}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </Col>
      </div>
    </div>
  );
};
export default ProductUpdate;
