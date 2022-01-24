const fs = require("fs");
const path = require("path");

const readJSON = (dir) => {
  try {
    let data = fs.readFileSync(dir);
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(error);
  }
};

const writeJSON = (dir, content) => {
  try {
    fs.writeFileSync(dir, content);
  } catch (error) {
    console.error(error);
  }
};

const requireConfigJSON = (name) => {
  return readJSON(path.join(__dirname, process.env.GAME_DIR, `config/${name}.json`));
}

export { requireConfigJSON, readJSON, writeJSON };
