const get = (endpoint, params) => {
  let paramQuery = Object.entries(params)
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

const post = (endpoint, body) => {
  let url = `http://localhost:8000/${endpoint}`;
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
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
  return post("setWorkingPath", { path });
};

const getConfigJSON = (name) => {
  return get("getConfigJSON", { name });
};

const saveConfigJSON = (name, data) => {
  return post("saveConfigJSON", {
    name,
    data: JSON.stringify(data),
  });
};

export { setWorkingPath, getConfigJSON, saveConfigJSON };
