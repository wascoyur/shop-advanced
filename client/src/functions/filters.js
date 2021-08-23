import { fetchAttributes } from './product';

export const getAttributes = async (attribute, product = '') => {
  const { data: fetchattributes } = await fetchAttributes({
    attribute: attribute,
    product: product,
  });

  return fetchattributes;
};
