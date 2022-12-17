import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const getDirVariables = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const currentFile = path.basename(__filename);

  return { currentFile, __dirname };
};

const getFilteredModelsFiles = (currentFile, directory) => {
  const models = fs.readdirSync(directory);
  const fileIsModel = (file) => file !== currentFile && file.endsWith('.js');
  return models.filter((model) => fileIsModel(model));
};

const loadModels = async (modelFiles, directory, sequelize) => {
  let models = {};

  for (const file of modelFiles) {
    const model = await import(path.join(directory, file));
    const hasDefaultKey = Object.keys(model).some((key) => key === 'default');
    const modelDefault = hasDefaultKey ? model.default : undefined;

    if (modelDefault && modelDefault.name) {
      models[modelDefault.name] = modelDefault;
    }

    models.sequelize = sequelize

    return models
  }
};

export async function registerModels(sequelize) {
  const { currentFile, __dirname } = getDirVariables();

  const modelFiles = getFilteredModelsFiles(currentFile, __dirname);

  const modelsLoaded = await loadModels(modelFiles, __dirname);

  console.log(modelsLoaded)

  return modelsLoaded;
}

registerModels();
