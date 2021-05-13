import React, { useState, useEffect, Fragment } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(match.params.slug).then((c) => setName(c.data.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('name:', name, 'user:', user);
    setLoading(true);

    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log('res:', res);
        setLoading(false);
        setName('');
        toast.success(`Категория "${res.data.name}" изменена`);
        history.push('/admin/category');
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
            <h4>Редактировать категорию</h4>
          )}
          {categoryForm()}
          <hr />
          {/* {categories.map((item) => (
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
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
