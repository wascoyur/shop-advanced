import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getSubs().then((c) => {
      setSubs(c.data);
      setLoading(false);
    });
    // console.log('categories',categories);
  }, []);

  const showSubs = () => {
    return subs.map((item) => (
      <div
        className='col btn btn-outlined-primary btn-lg btn-raised m-3'
        key={item._id}>
        <Link to={`/sub/${item.slug}`}>{item.name}</Link>
      </div>
    ));
  };

  return (
    <div className='container'>
      <div className='row'>
        {loading ? (
          <h4 className='text-center'>Загружается...</h4>
        ) : (
          showSubs()
          // JSON.stringify(categories)
        )}
      </div>
    </div>
  );
};

export default SubList;
