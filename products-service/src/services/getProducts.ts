import { Product } from '../models';
import createConnection from '../config/database';

export default async (): Promise<Product[]> => {
  const connection = await createConnection();
  const productRepository = connection.getRepository(Product);
  const data = await productRepository.find();

  await connection.close();
  return data;
};
