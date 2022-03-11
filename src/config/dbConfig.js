module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    charset: "utf8",
    timezone: "UTC",
  },
  pool: {
    min: 0,
    max: 8,
    acquireTimeoutMillis: 45000,
    idleTimeoutMillis: 20000,
  },
  migrations: {
    directory: "./knex/migrations",
    tableName: "knex_migrations",
  },
};
