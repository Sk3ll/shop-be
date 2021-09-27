import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ProductSchema } from '@schemas';
import errorHandler from '@utils/errorHandler';
import { HttpStatusCode } from '@utils/constants';
import createProductService from '../../services/createProduct';
import { Product, Stock } from '../../entity';

type ProductDTO = Product & Stock['count'];

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof ProductSchema> = async event => {
  try {
    console.log(`INFO: ${event}`);
    await createProductService(event.body as unknown as ProductDTO);

    return formatJSONResponse({
      status: HttpStatusCode.OK,
    });
  } catch (e) {
    console.log(`ERROR: status[${e.status || 500}] ${e.message || 'Internal server error'}`);
    return errorHandler(e);
  }
};

export const main = middyfy(createProduct);
