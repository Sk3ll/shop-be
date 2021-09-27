import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import getHandlerWrapper from '@utils/wrappers/getHandlerWrapper';
import getProductsService from '../../services/getProducts';

const getProductsList = getHandlerWrapper(getProductsService);

export const main = middyfy(getProductsList);
