import type { AWS } from '@serverless/typescript';
// import dotenv from 'dotenv';

import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';
import openapi from './src/documentation/openapi';

// dotenv.config();
//
// const { HOST_DB, PORT_DB, USER_DB, PASS_DB, NAME_DB } = process.env;

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
      HOST_DB: 'storedb.cmjbog3ffgsm.eu-west-1.rds.amazonaws.com',
      PORT_DB: '5432',
      USER_DB: 'postgres',
      PASS_DB: 'password',
      NAME_DB: 'storedb',
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
    createProduct,
  },
};

module.exports = serverlessConfiguration;
