const run = () => {
  return new Promise(async (resolve, reject) => {
    let url = `http://localhost:8000/run`;
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
  return new Promise(async (resolve, reject) => {
    let url = `http://localhost:8000/setWorkingPath?path=${path}`;
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

const getConfigJSON = (name) => {
  return new Promise(async (resolve, reject) => {
    let url = `http://localhost:8000/getConfigJSON?name=${name}`;
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

const saveConfigJSON = (name, data) => {
  return new Promise(async (resolve, reject) => {
    let url = `http://localhost:8000/saveConfigJSON?name=${name}&data=${JSON.stringify(
      data
    )}`;
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

export { run, setWorkingPath, getConfigJSON, saveConfigJSON };
