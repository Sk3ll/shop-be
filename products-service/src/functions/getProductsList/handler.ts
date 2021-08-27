import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ProductSchema } from '@schemas';
import errorHandler from '@utils/errorHandler';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import products from '../productsMock.json';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ProductSchema> = async () => {
  try {
    return formatJSONResponse({
      status: 200,
      data: products,
    });
  } catch (e) {
    return errorHandler(e);
  }
};

export const main = middyfy(getProductsList);
