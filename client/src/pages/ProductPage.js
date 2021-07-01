import React, { useCallback, useEffect, useState } from 'react';
import { getProduct } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;
  const [star, setStar]=useState(0)

  const loadSingleProduct = useCallback(() => {
    getProduct(slug).then((res) => setProduct(res.data));
  }, [slug]);

  useEffect(() => {
    loadSingleProduct();
  }, [slug, loadSingleProduct]);

  const onStarClick = (newRating, name) => {
    console.table('newRating, name', newRating, name);
    setStar(newRating)
  }

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct product={product} onStarClick={onStarClick} star={star}/>{' '}
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
