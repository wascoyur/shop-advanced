import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    return getCategories().then((c) => {
      return setCategories(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('name:', name, 'user:', user);
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        // console.log('res:', res);
        setLoading(false);
        setName('');
        toast.success(`Категория ${res.data.name} создана`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        // console.log('error:', err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleRemove = async (slug) => {
    // let confirm = window.confirm('Точно удалить?');
    // console.log(confirm, slug);
    if (window.confirm('Точно удалить?')) {
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`Категория "${res.data.name}" удалена`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Загружается...</h4>
          ) : (
            <h4>Создать категорию</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {categories.filter(searched(keyword)).map((item) => (
            <div key={item._id} className='alert alert-primary'>
              {item.name}
              <span
                onClick={() => handleRemove(item.slug)}
                className='btn btn-sm float-right'>
                <DeleteOutlined className='text-danger' />
              </span>
              <Link
                to={`/admin/category/${item.slug}`}
                className='btn btn-sm float-right'>
                <EditOutlined className='text-warning' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
