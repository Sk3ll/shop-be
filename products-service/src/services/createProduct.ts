import { BadRequestError } from '@utils/errors';
import { validateProduct } from '@utils/validators';
import { HttpStatusCode } from '@utils/constants';
import { Product, Stock } from '../entity';
import createConnection from '../config/database';

export default async (product: Product & Stock['count']): Promise<void> => {
  const errors = validateProduct(product);

  if (errors) {
    throw new BadRequestError(HttpStatusCode.BAD_REQUEST, errors[0].message);
  }

  // const { count, ...rest } = product;

  const connection = await createConnection();
  const productRepository = connection.getRepository(Product);
  // const stockRepository = connection.getRepository(Stock);
  const createdProduct = productRepository.create(product);
  // const createdStock = stockRepository.create({ count, productId: product.id });
  const closed = connection.close();

  await Promise.all([createdProduct, closed]);
};
