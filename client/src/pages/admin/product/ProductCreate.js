import { LoadingOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FileUpload from '../../../components/forms/FileUpload';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories, getCategorySubs } from '../../../functions/category';
import { createProduct } from '../../../functions/product';

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

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadCategories = useCallback(() => {
    getCategories().then((item) =>
      setValues({ ...values, categories: item.data }),
    );
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(values, user.token)
      .then((res) => {
        // console.log('res', res);
        window.alert(`Товар "${res.data.title}" создан`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 400) toast.error(error.response.data);
        toast.error(error.response.data.error);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log('e.target.value ', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      // console.log('getCategorySubs: res.data', res.data);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        {loading ? (
          <LoadingOutlined className='text-danger' />
        ) : (
          <h4>Создание продукта</h4>
        )}
        <div className='col-md-10'>
          <hr />
          <div className='p-3'>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;
