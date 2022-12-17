import { Sequelize } from 'sequelize';
import { registerModels } from '../models';

const DEFAULT_ENVIRONMENT = 'test';
const SUCCESS_MESSAGE = 'Connection established successfully';

class Database {
  constructor(environment, dbConfig) {
    this.environment = environment || DEFAULT_ENVIRONMENT;
    this.dbConfig = dbConfig[this.environment];
    this.isTestEnv = this.environment === 'test';
    this.connection = null;
  }

  async connect() {
    const connectionString = this.getConnectionString();
    const logging = this.isTestEnv ? false : console.log;

    this.setConnection(connectionString, logging);

    await this.authenticate();
    await registerModels(this.connection);
    await this.sync();
  }

  async authenticate() {
    await this.connection.authenticate();
    this.logSuccessfully();
  }

  async sync() {
    await this.connection.sync({
      force: this.isTestEnv,
      logging: false,
    });

    this.logSuccessfully();
  }

  async disconnect() {
    await this.connection.close();
  }

  setConnection(string, logging = false) {
    this.connection = new Sequelize(string, { logging });
  }

  getConnectionString() {
    const { username, password, host, database, dialect } = this.dbConfig;
    return `${dialect}://${username}:${password}@${host}:${port}/${database}`;
  }

  logSuccessfully() {
    if (!this.isTestEnv) console.log(SUCCESS_MESSAGE);
  }
}

export default Database;
