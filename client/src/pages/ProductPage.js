import React, { useCallback, useEffect, useState } from 'react';
import { getProduct, setProductStar } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import { getRelated } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import { Row, Col } from 'antd';

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const [related, setRelated] = useState([]);

  const loadSingleProduct = useCallback(() => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
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
  }, [product.raitings, user]);

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
      <div className='site-card-wrapper'>
        <Row gutter={16}>
          {related.length ? (
            related.map((i) => {
              return (
                <Col span={6} key={i._id} offset={5}>
                  <ProductCard product={i} />
                </Col>
              );
            })
          ) : (
            <div className='text-center col'>Пока нет похожих товаров</div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default ProductPage;
