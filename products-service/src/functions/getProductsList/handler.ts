import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ProductSchema } from '@schemas';
import { HttpStatusCode } from '@utils/constants';
import errorHandler from '@utils/errorHandler';
import { Product } from '../../models';
import getProductsService from '../../services/getProducts';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ProductSchema> = async () => {
  try {
    const data: Product[] = await getProductsService();

    return formatJSONResponse({
      status: HttpStatusCode.OK,
      data,
    });
  } catch (e) {
    return errorHandler(e);
  }
};

export const main = middyfy(getProductsList);
