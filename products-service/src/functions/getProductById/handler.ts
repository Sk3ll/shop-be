import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { NotFoundError } from '@utils/errors';
import { ProductSchema } from '@schemas';
import errorHandler from '@utils/errorHandler';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import products from '../productsMock.json';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof ProductSchema> = async event => {
  try {
    const { id } = event.pathParameters;
    const data = products.find(product => product.id === id);

    if (!data) {
      throw new NotFoundError();
    }

    return formatJSONResponse({
      status: 200,
      data,
    });
  } catch (e) {
    return errorHandler(e);
  }
};

export const main = middyfy(getProductById);
