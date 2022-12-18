import { Sequelize } from 'sequelize';
import { registerModels } from '../models/index.js';

class Database {
  constructor(environment, dbConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig;
    this.isTestEnv = this.environment === 'test';
    this.connection = null;
  }

  async connect() {
    const connectionString = this.getConnectionString();
    const logging = this.isTestEnv ? false : console.log;

    this.setConnection(connectionString, logging);

    await this.authenticate();
    await this.sync();
    this.registerDBModels();
  }

  async authenticate() {
    await this.connection.authenticate();
    console.log('DB authenticated with success');
  }

  async sync() {
    await this.connection.sync({
      force: this.isTestEnv,
      logging: false,
    });
    console.log('DB synchronized with success');
  }

  async disconnect() {
    await this.connection.close();
  }

  registerDBModels() {
    registerModels(this.connection);
    console.log('Models registered with success');
  }

  setConnection(string, logging = false) {
    this.connection = new Sequelize(string, { logging });
  }

  getConnectionString() {
    const { username, password, host, database, port, dialect } = this.dbConfig;
    return `${dialect}://${username}:${password}@${host}:${port}/${database}`;
  }
}

export default Database;
