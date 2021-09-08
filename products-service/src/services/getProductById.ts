import { Product } from '../entity';
import createConnection from '../config/database';

export default async (id: string): Promise<Product> => {
  const connection = await createConnection();
  const productRepository = connection.getRepository(Product);
  const data = await productRepository.query(
    `select p.id, p.title, p.price, s.count, p.description from products as p join stocks s on p.id = s.productid where p.id = '${id}';`
  );

  await connection.close();
  return data[0];
};
