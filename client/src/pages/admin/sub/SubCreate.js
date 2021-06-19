import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import { createSub, getSubs, removeSub } from '../../../functions/sub';

const SubCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((c) => setSubs(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('name:', name, 'user:', user);
    setLoading(true);

    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log('res:', res);
        setLoading(false);
        setName('');
        toast.success(`Подкатегория ${res.data.name} создана`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`Подкатегория "${res.data.name}" удалена`);
          loadSubs();
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
            <h4>Создать подкатегорию</h4>
          )}

          <div className='form-group'>
            <label>Родительская категория</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}>
              <option>Выберите родительскую категорию</option>
              {categories.length > 0 &&
                categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {JSON.stringify(category)}
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subs.filter(searched(keyword)).map((item) => (
            <div key={item._id} className='alert alert-primary'>
              {item.name}
              <span
                onClick={() => handleRemove(item.slug)}
                className='btn btn-sm float-right'>
                <DeleteOutlined className='text-danger' />
              </span>
              <Link
                to={`/admin/sub/${item.slug}`}
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

export default SubCreate;
