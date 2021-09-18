import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { useSelector, useDispatch } from 'react-redux';
import { getWishList, removeWishList } from '../../functions/user';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishList();
  }, []);

  const loadWishList = () => {
    getWishList(user.token).then((res) => setWishlist(res.data.wishlist));
  };

  const handleRemove = (productId) => {
    removeWishList(productId, user.token).then((res) => loadWishList());
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          <h4 className='text-center'>user Wishlist page</h4>
          {wishlist.map((p) => (
            <div key={p._id} className='alert alert-secondary'>
              <Link to={`/product/${p._id}`}>
                {p.title} - {p.color}
              </Link>
              <span
                className='btn btn-sm float-right'
                onClick={() => handleRemove(p._id)}>
                Удалить <DeleteOutlined className='text-danger' />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
