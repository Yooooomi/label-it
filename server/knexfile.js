module.exports = {
  client: 'postgresql',
  connection: {
    database: 'labelit',
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD
  },
  migrations: {
    tableName: 'knex_migrations'
  },
};
