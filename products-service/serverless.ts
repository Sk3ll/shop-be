import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';
import openapi from './src/documentation/openapi';

const serverlessConfiguration: AWS = {
  service: 'products-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    documentation: openapi,
  },
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-aws-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    httpApi: {
      cors: true,
    },
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductById,
  },
};

module.exports = serverlessConfiguration;
