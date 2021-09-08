import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ProductSchema } from '@schemas';
import errorHandler from '@utils/errorHandler';
import { HttpStatusCode } from '@utils/constants';
import createProductService from '../../services/createProduct';
import { Product } from '../../entity';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof ProductSchema> = async event => {
  try {
    await createProductService(event.body as Product);

    return formatJSONResponse({
      status: HttpStatusCode.OK,
    });
  } catch (e) {
    return errorHandler(e);
  }
};

export const main = middyfy(createProduct);
