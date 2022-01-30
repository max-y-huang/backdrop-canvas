const request = (endpoint, params) => {
  let paramQuery = params
    .reduce((acc, item) => `${acc}&${item[0]}=${item[1]}`, "")
    .slice(1); // Remove leading &.
  let url = `http://localhost:8000/${endpoint}?${paramQuery}`;
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(url);
      let json = await response.json();
      if (!response.ok) {
        throw json ? json : response.statusText;
      }
      resolve(json);
    } catch (error) {
      reject({ message: error });
    }
  });
};

const setWorkingPath = (path) => {
  return request("setWorkingPath", [["path", path]]);
};

const getConfigJSON = (name) => {
  return request("getConfigJSON", [["name", name]]);
};

const saveConfigJSON = (name, data) => {
  return request("saveConfigJSON", [
    ["name", name],
    ["data", JSON.stringify(data)],
  ]);
};

export { setWorkingPath, getConfigJSON, saveConfigJSON };
