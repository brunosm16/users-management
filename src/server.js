const { environment, dbConfig } = require('./config/index');
const Database = require('./database/Database').default;

(async () => {
  try {
    const { nodeEnvironment } = environment;

    const db = new Database(nodeEnvironment, dbConfig[nodeEnvironment]);

    await db.connect();
  } catch (err) {
    console.error(`An error occurred when initializing the app : ${err}`);
  }
})();
