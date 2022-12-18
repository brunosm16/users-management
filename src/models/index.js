const fs = require('fs');
const path = require('path');

const filterModelsFiles = (currentFile, directory) => {
  const models = fs.readdirSync(directory);
  const fileIsModel = (file) => file !== currentFile && file.endsWith('.js');
  return models.filter((model) => fileIsModel(model));
};

const getModelNameByFile = (file, directory, sequelize) => {
  const model = require(path.join(directory, file));
  const hasDefaultKey = Object.keys(model).some((key) => key === 'default');
  const defaultIsFunction = typeof model.default === 'function';

  if (hasDefaultKey && defaultIsFunction) {
    return model.default(sequelize) || null;
  }

  return null;
};

const loadModels = (modelFiles, directory, sequelize) => {
  const models = {};

  for (const file of modelFiles) {
    const model = getModelNameByFile(file, directory, sequelize);
    if (model && model.name) {
      models[model.name] = model;
    }
  }

  models.sequelize = sequelize;

  return models;
};

const registerModels = async (sequelize) => {
  const currentFile = path.basename(__filename);

  const modelFiles = filterModelsFiles(currentFile, __dirname);

  const modelsLoaded = loadModels(modelFiles, __dirname, sequelize);

  return modelsLoaded;
};

module.exports = {
  registerModels,
};
