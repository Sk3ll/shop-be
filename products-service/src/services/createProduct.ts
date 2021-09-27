import { BadRequestError } from '@utils/errors';
import { validateProduct } from '@utils/validators';
import { HttpStatusCode } from '@utils/constants';
import { Product, Stock } from '../entity';
import createConnection from '../config/database';

interface Count {
  count: Stock['count'];
}

type ProductDTO = Product & Count;

export default async (product: ProductDTO): Promise<void> => {
  const errors = validateProduct(product);

  if (errors) {
    throw new BadRequestError(HttpStatusCode.BAD_REQUEST, errors[0].message);
  }

  const { count, ...rest } = product;

  const connection = await createConnection();
  const productRepository = connection.getRepository(Product);
  const stockRepository = connection.getRepository(Stock);
  const createdProduct = await productRepository.create(rest);
  const stockData = { count, productId: createdProduct.id };
  const createdStock = await stockRepository.create(stockData);
  const closed = connection.close();

  await Promise.all([createdProduct, createdStock, closed]);
};
