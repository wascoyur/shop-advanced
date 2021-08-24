import { fetchAttributes } from './product';

export const getAttributes = async (attribute, product = '',id) => {
  const { data: fetchattributes } = await fetchAttributes({
    attribute: attribute,
    product: product,
    id:id
  });

  return fetchattributes;
};
