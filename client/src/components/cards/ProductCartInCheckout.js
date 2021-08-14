import React from 'react';
import { Fragment } from 'react';
import ModalImage from 'react-modal-image';
import blank from '../../images/blank.png'

const ProductCartInCheckout = ({ p }) => {
  return (
    <Fragment>
      <tbody>
        <tr>
          <td>
            <div style={{width:'50px', high:'auto'}}>
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
          <td>{p.color}</td>
          <td>{p.count}</td>
          <td>{p.shipping}</td>
        </tr>
      </tbody>
    </Fragment>
  );
};

export default ProductCartInCheckout;
