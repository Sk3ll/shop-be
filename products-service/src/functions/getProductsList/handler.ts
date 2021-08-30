import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ProductSchema } from '@schemas';
import errorHandler from '@utils/errorHandler';
import HttpStatusCode from '@utils/constants/HttpStatusCode';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import products from '../productsMock.json';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof ProductSchema> = async () => {
  try {
    return formatJSONResponse({
      status: HttpStatusCode.OK,
      data: products,
    });
  } catch (e) {
    return errorHandler(e);
  }
};

export const main = middyfy(getProductsList);
