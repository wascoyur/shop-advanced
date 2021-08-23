import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import ModalImage from 'react-modal-image';
import { getAttributes } from '../../functions/filters';
import blank from '../../images/blank.png';
import { useDispatch } from 'react-redux';

const ProductCartInCheckout = ({ p }) => {
  const [colors, setColors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const colors = getAttributes('color', p.title).then((c) => setColors(c));
    // debugger
    // console.log('colors', colors);
  }, []);

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== 'unefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({ type: 'ADD_TO_CART', payload: cart });
    }
  };

  return (
    <Fragment>
      <tbody>
        <tr>
          <td>
            <div style={{ width: '50px', high: 'auto' }}>
              {p.images.length ? (
                <ModalImage small={p.images[0].url} large={p.images[0].url} />
              ) : (
                <ModalImage small={blank} large={blank} />
              )}
            </div>
          </td>
          <td>{p.title}</td>
          <td>{p.price}</td>
          <td>{p.brand}</td>
          <td>
            <select
              onChange={handleColorChange}
              name='color'
              className='form-control'>
              {p.color ? (
                <option value={p.color}>{p.color}</option>
              ) : (
                <option>Выбирайте цвет</option>
              )}
              {colors
                .filter((c) => c !== p.color)
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </td>
          <td>{p.count}</td>
          <td>{p.shipping}</td>
        </tr>
      </tbody>
    </Fragment>
  );
};

export default ProductCartInCheckout;
