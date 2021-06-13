import axios from 'axios';

export const createProduct = async (product, authtoken) => {
  // console.log('createProduct');

  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const removeProduct = async (slug, authtoken) => {
  // console.log('removeProduct', slug, authtoken);

  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProductsByCount = async (count) => {
  // console.log('createProduct');

  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const getProduct = async (slug) => {
  // console.log('getProduct');

  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};
