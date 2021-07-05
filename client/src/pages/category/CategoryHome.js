import React, { useEffect } from 'react';
import { getCategory } from '../../functions/category';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(match.params.slug).then((c) => {
      // console.log(JSON.stringify(c.data, null, 4));
      setCategory(c.data);
    });
    setLoading(false);
  }, []);

  return (JSON.stringify(category));
};

export default CategoryHome;
