import React, { useState, useEffect, useCallback } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { updateSub, getSub } from '../../../functions/sub';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({ match, history }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState('');
  const [parent, setParent] = useState([]);

  const loadCategories = useCallback(() =>
    getCategories().then((c) => setCategories(c.data)),[])

  const loadSub = useCallback(
    () =>
      getSub(match.params.slug).then((item) => {
        setName(item.data.name);
        setParent(item.data.parent);
      }),
    [match.params.slug],
  );
  
  useEffect(() => {
    loadCategories();
    loadSub();
  }, [loadSub,loadCategories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('name:', name, 'user:', user);
    setLoading(true);

    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log('res:', res);
        setLoading(false);
        setName('');
        toast.success(`Подкатегория ${res.data.name} создана`);
        history.push('/admin/sub');
      })
      .catch((err) => {
        setLoading(false);
        // console.log('error:', err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

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
            <h4>Обновить подкатегорию</h4>
          )}
          <div className='form-group'>
            <label>Родительская категория</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setParent(e.target.value)}>
              <option>Выберите родительскую категорию</option>
              {categories.length > 0 &&
                categories.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                    selected={item._id === parent}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {/* Parent Category: {parent} */}
          {/* <LocalSearch keyword={keyword} setKeyword={setKeyword} /> */}
          {/* {subs.filter(searched(keyword)).map((item) => (
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
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
