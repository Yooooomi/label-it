module.exports = {
  client: 'postgresql',
  connection: {
    database: 'labelit',
    host: process.env.POSTGRES_ENDPOINT,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations',
  },
};
