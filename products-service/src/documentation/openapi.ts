import paths from './paths';

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    name: 'Sk3ll Store API',
    description: 'Sk3ll Store API description',
    contact: {
      name: 'Yaroslav Sk3ll Malykhin',
      url: 'https://github.com/Sk3ll',
      email: 'sk3llyar@gmail.com',
    },
    licence: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  tags: [
    {
      name: 'Products',
    },
  ],
  resources: [paths],
};
