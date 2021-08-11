import { fetchAttributes } from './product';

export const getAttributes = async (attribute) => {
  const { data: fetchattributes } = await fetchAttributes({
    attribute: attribute,
  });

  return fetchattributes;
};
