import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import ModalImage from 'react-modal-image';
import { getAttributes } from '../../functions/filters';
import blank from '../../images/blank.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const ProductCartInCheckout = ({ p }) => {
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    getAttributes('color', p.title).then((c) => setColors(c));
    getAttributes('quantity', '', p._id).then((c) => setQuantity(c));
    // debugger
    // console.log('colors', colors);
  }, []);

  const handleChangeAtribute = ({ target: { value, name } }) => {
    let cart = [];
    console.log('name:', name, 'value:', value);
    if ((name === 'count' && value < 1) || value > quantity) {
      toast.error(
        `Указанного товара больше нет на складе. Доступно ${quantity} шт.`,
      );
      return;
    }
    if (typeof window !== 'unefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i][name] = value;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({ type: 'ADD_TO_CART', payload: cart });
    }
  };

  const hanndleRemove=()=>{
    let cart = [];
     
    if (typeof window !== 'unefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i,1);
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({ type: 'ADD_TO_CART', payload: cart });
    }
  }

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
              onChange={handleChangeAtribute}
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
          <td className='text-center'>
            <input
              name='count'
              className='form-control'
              type='number'
              value={p.count}
              onChange={handleChangeAtribute}
            />
          </td>
          <td className='text-center'>{p.shipping}</td>
          <td className='text-danger pointer text-center'>
            <CloseCircleOutlined onClick={hanndleRemove} />
          </td>
        </tr>
      </tbody>
    </Fragment>
  );
};

export default ProductCartInCheckout;
