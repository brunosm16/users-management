const dialect = 'mysql';

module.exports = (env) => {
  const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_ROOT_PASSWORD,
    DB_HOST,
    DB_DATABASE,
    DB_PORT,
    DB_TEST_USERNAME,
    DB_TEST_PASSWORD,
    DB_TEST_ROOT_PASSWORD,
    DB_TEST_HOST,
    DB_TEST_DATABASE,
    DB_TEST_PORT,
  } = env;

  return {
    development: {
      username: DB_USERNAME || 'root',
      password: DB_PASSWORD || 'root',
      rootPassword: DB_ROOT_PASSWORD || 'root',
      host: DB_HOST || 'localhost',
      database: DB_DATABASE || 'users_management_development',
      port: parseInt(DB_PORT) || 3306,
      dialect,
    },
    test: {
      username: DB_TEST_USERNAME || 'mysql',
      password: DB_TEST_PASSWORD || 'root',
      rootPassword: DB_TEST_ROOT_PASSWORD || 'root',
      host: DB_TEST_HOST || 'localhost',
      database: DB_TEST_DATABASE || 'users_management_test',
      port: parseInt(DB_TEST_PORT) || 3307,
      dialect,
    },
  };
};
