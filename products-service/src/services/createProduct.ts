import { Product } from '../models';
import createConnection from '../config/database';

export default async (product: Product): Promise<Product> => {
  const connection = await createConnection();
  const productRepository = connection.getRepository(Product);
  const data = await productRepository.create(product);

  await connection.close();
  return data;
};
