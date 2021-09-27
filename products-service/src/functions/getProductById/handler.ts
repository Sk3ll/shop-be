import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import getHandlerWrapper from '@utils/wrappers/getHandlerWrapper';
import getProductService from '../../services/getProductById';

const getProductById = getHandlerWrapper(getProductService);

export const main = middyfy(getProductById);
