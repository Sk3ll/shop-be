import dotenv from 'dotenv';

dotenv.config();

const { HOST_DB, PORT_DB, USER_DB, PASS_DB, NAME_DB } = process.env;

export default {
  type: 'postgres',
  host: HOST_DB,
  port: PORT_DB,
  username: USER_DB,
  password: PASS_DB,
  database: NAME_DB,
  synchronize: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['database/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'database/migrations',
    subscribersDir: 'src/subscriber',
  },
};
