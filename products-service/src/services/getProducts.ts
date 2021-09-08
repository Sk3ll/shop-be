import { Product, Stock } from '../entity';
import createConnection from '../config/database';

export default async (): Promise<Array<Product & Stock['count']>> => {
  const connection = await createConnection();
  const productRepository = connection.getRepository(Product);
  const data = await productRepository.query(
    'select p.id, p.title, p.price, s.count, p.description from products as p join stocks s on p.id = s.productid;'
  );

  await connection.close();
  return data;
};
