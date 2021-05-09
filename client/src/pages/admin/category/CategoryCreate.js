import React, { useState, useEffect, Fragment } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories } from '../../../functions/category';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);

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
      })
      .catch((err) => {
        setLoading(false);
        // console.log('error:', err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Наименование категории</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className='btn btn-outline-primary'>Сохранить</button>
      </div>
    </form>
  );

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
          {categoryForm()}
          <hr />
          <div className='container-fluid'>
            <div className='col-md-2'>Категорий: {categories.length}</div>
            <div className='row'>
              <div className='col-md-4'>
                Список категорий:
                {categories.map((item) => {
                  return (
                    <Fragment>
                      <div className='row'>
                        <div className='col-md-2'>{item.name}</div>
                        <div className='col-md-2'>{item._id}</div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
