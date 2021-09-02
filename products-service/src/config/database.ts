import { createConnection, Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  // port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  uuidExtension: 'uuid-ossp',
};

const connection = async (): Promise<Connection> => await createConnection(options);

export default connection;
