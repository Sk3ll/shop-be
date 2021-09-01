// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import products from '../../services/productsMock.json';
import { Product } from '../models';

export default async (id: string): Promise<Product> => {
  const product = products.find(item => item.id === id);
  return Promise.resolve(product);
};
