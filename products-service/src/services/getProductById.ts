import { Product } from '../models';
import createConnection from '../config/database';

export default async (id: string): Promise<Product> => {
  const connection = await createConnection();
  const productRepository = connection.getRepository(Product);
  const data = await productRepository.findOne(id);

  await connection.close();
  return data;
};
