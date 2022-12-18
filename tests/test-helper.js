const { dbConfig } = require('./config/index');
const Database = require('./database/Database').default;

let db;

class TestHelper {
  static async startDB() {
    db = new Database('test', dbConfig['test']);

    await db.connect();

    return db;
  }

  static async stopDB() {
    await db.disconnect();
  }

  static async syncDB() {
    await db.sync();
  }
}

export default TestHelper;
