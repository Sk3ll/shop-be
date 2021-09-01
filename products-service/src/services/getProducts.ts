// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import products from '../../services/productsMock.json';
import { Product } from '../models';

export default async (): Promise<Product[]> => Promise.resolve(products);
