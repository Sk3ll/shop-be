import { createConnection, Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dotenv from 'dotenv';
import { Product, Stock } from '../entity';

dotenv.config();

const { HOST_DB, PORT_DB, USER_DB, PASS_DB, NAME_DB } = process.env;

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: HOST_DB,
  port: +PORT_DB,
  username: USER_DB,
  password: PASS_DB,
  database: NAME_DB,
  uuidExtension: 'uuid-ossp',
  entities: [Product, Stock],
};

const connection = async (): Promise<Connection> => await createConnection(options);

export default connection;
