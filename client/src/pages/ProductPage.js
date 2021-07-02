import React, { useCallback, useEffect, useState } from 'react';
import { getProduct, setProductStar } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));

  const loadSingleProduct = useCallback(() => {
    getProduct(slug).then((res) => setProduct(res.data));
  }, [slug]);

  useEffect(() => {
    loadSingleProduct();
  }, [slug, loadSingleProduct]);

  useEffect(() => {
    if (product.raitings && user) {
      
      let existingRaitingObject = product.raitings.find(
        (i) => i.postedBy.toString() === user._id.toString(),
      );
      
      existingRaitingObject && setStar(existingRaitingObject.star);
    }
  },[product.raitings]);

  const onStarClick = (newRating, name) => {
    // console.log('newRating, name', newRating, name);
    setStar(newRating);

    setProductStar(name, newRating, user.token).then((res) => {
      // console.log('res', res);
      loadSingleProduct();
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />{' '}
      </div>
      <div className='row p-4'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Похожие товары</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
