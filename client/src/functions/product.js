import axios from 'axios';

export const createProduct = async (product, authtoken) => {
  // console.log('createProduct');

  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const updateProduct = async (slug, product, authtoken) => {
  // console.log('updateProduct');

  return await axios.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    },
  );
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
  // console.log('getProduct', slug);

  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

export const getProducts = async (sort, order, page) => {
  // console.log('getProducts', sort, order, limit);

  return await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });
};

export const getProductsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

export const setProductStar = async (productId, star, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    { headers: { authtoken } },
  );
};

export const getRelated = async (productId) => {

// console.log('productId', productId);
  return await axios.get(
    `${process.env.REACT_APP_API}/product/related/${productId}`,
  );
};

export const fetchProductsByFilter = async (args) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`,args)
}
export const fetchAttributes = async (attr) => {
  // console.log('attr', attr);
  
  return await axios.post(`${process.env.REACT_APP_API}/search/filters/attributes`,attr)
}