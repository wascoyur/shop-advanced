import { Col, Drawer, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: '100%',
    hight: '50px',
    objectFit: 'cover',
  };

  return (
    <Drawer
      title={`В корзине ${cart.length} товара(ов)`}
      placement={'right'}
      visible={drawer}
      onClose={() => {
        dispatch({ type: 'SET_VISIBLE', payload: false });
      }}>
      {cart.map((p) => (
        <Row key={p._id}>
          <Col>
            <>
              <img src={p.images[0].url} style={imageStyle} alt='' />
              <p className='text-center bg-secondary text-light'>
                {p.title} x {p.count}
              </p>
            </>
          </Col>
        </Row>
      ))}
      <Link to='/cart'>
        <button
          className='text-center btn btn-primary btn-raised btn-block'
          onClick={() => {
            dispatch({
              type: 'SET_VISIBLE',
              payload: false,
            });
          }}>
          В корзину
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
