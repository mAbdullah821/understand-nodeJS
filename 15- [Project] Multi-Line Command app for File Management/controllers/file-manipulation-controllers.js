const fs = require('fs/promises');

const createFile = async (path) => {
  try {
    const fileHandler = await fs.open(path);
    fileHandler.close();
    console.error(`The file ${path} is already exists`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        // with the 'w' flag, the file will create if it does not exist
        const fileHandler = await fs.open(path, 'w');
        fileHandler.close();

        console.log(`The file ${path} created successfully!`);
      } catch (error) {
        console.error(`Error creating file: ${error}`);
      }
    } else {
      console.error(`Error opening file: ${err}`);
    }
  }
};

const deleteFile = async (path) => {
  try {
    await fs.unlink(path);
    console.log(`The file ${path} was deleted successfully!`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`The file ${path} is not exists`);
    } else {
      console.error(`Error deleting file: ${err}`);
    }
  }
};

const renameFile = async (oldPath, newPath) => {
  try {
    await fs.rename(oldPath, newPath);
    console.log(`Renamed file from '${oldPath}' to '${newPath}' successfully!`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`The file ${err.path} not found`);
    } else {
      console.error(`Error renaming file: ${err}`);
    }
  }
};

const addToFile = async (path, content) => {
  try {
    const fileHandler = await fs.open(path, 'a');
    await fileHandler.appendFile(content);
    fileHandler.close();
    console.log(`Content added successfully! to the file ${path}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`The file ${path} not found`);
    } else {
      console.error(`Error adding content to file: ${err}`);
    }
  }
};

module.exports = {
  createFile,
  deleteFile,
  renameFile,
  addToFile,
};