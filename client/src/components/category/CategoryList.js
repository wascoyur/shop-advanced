import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
    // console.log('categories',categories);
  }, []);

  const showCategories = () => {
    return categories.map((item) => (
      <div className='col btn btn-outlined-primary btn-lg btn-raised m-3' key={item._id}>
        <Link to={`/category/${item.slug}`}>{item.name}</Link>
      </div>
    ));
  };

  return (
    <div className='container'>
      <div className='row'>
        {loading ? (
          <h4 className='text-center'>Загружается...</h4>
        ) : (
          showCategories()
          // JSON.stringify(categories)
        )}
      </div>
    </div>
  );
};

export default CategoryList;
