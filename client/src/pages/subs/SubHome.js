import { Col, Row } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getSub } from '../../functions/sub';

const SubHome = ({ match }) => {
  const [subs, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSub(match.params.slug).then((c) => {
      // console.log(JSON.stringify(c.data.products, null, 4));
      setSub(c.data.sub);
      setProducts(c.data.products);
    });
    setLoading(false);
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4 className='text-center p-3 mt-5 m-2 display-4 jumbotron'>
              Загружается...
            </h4>
          ) : (
            <Fragment>
              <h4 className='text-center p-3 mt-5 m-2 display-4 jumbotron'>
                В выбранной подкатегории {subs.name} товаров: {products.length}{' '}
                шт.
              </h4>
              <Row>
                {products.map((p) => (
                  <Col md={4} key={p._id}>
                    <ProductCard product={p} />
                  </Col>
                ))}
              </Row>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHome;
