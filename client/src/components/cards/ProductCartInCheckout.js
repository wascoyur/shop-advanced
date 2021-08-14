import React from 'react';
import { Fragment } from 'react';

const ProductCartInCheckout = ({ p }) => {
  return (
    <Fragment>
      <tbody>
        <tr>
          <td>Image</td>
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
