import { internalServerError, notFoundResponse } from '../constants/responses';

const paramId = {
  id: 'id',
  in: 'path',
  name: 'id',
  description: 'ID of product',
  required: true,
};

export default {
  '/products': {
    get: {
      tags: ['Products'],
      summary: 'Receive everything products',
      description: 'Returns array of object products',
      operationId: 'getProductsList',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Return array of product object',
          schema: {
            type: 'array',
            items: {
              ...{},
            },
          },
        },
        500: internalServerError,
      },
    },
  },

  '/products/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Receive everything products',
      description: 'Returns one product',
      produces: ['application/json'],
      parameters: [paramId],
      responses: {
        200: {
          description: 'Return product object',
          // schema: ,
        },
        404: notFoundResponse,
        500: internalServerError,
      },
    },
  },
};
