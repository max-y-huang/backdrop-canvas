const fs = require("fs");
const path = require("path");
const http = require("http");
const express = require("express");

const WHITE = "\x1b[37m";
const CYAN = "\x1b[36m";

let app = express();
let server = http.createServer(app);

// app.use(express.static(__dirname));
server.listen(8000, () => {
  let port = server.address().port;
  process.stdout.write(
    `${CYAN}Starting server at the following locations:\n\n`
  );
  process.stdout.write(`Local host:  http://localhost:${port}\n${WHITE}`);
});

let __path;

app.get("/setWorkingPath", (req, res) => {
  if (!req.query.path) {
    return res.status(400).json({ message: "Undefined path." });
  }
  __path = req.query.path;
  res.status(200).json({ path: __path });
});

app.get("/getConfigJSON", (req, res) => {
  if (!__path) {
    return res.status(400).json({ message: "Undefined __path." });
  }
  if (!req.query.name) {
    return res.status(400).json({ message: "Undefined name." });
  }
  try {
    let data = fs.readFileSync(
      path.join(__path, `config/${req.query.name}.json`)
    );
    return res.status(200).json(JSON.parse(data.toString()));
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

app.get("/saveConfigJSON", (req, res) => {
  if (!__path) {
    return res.status(400).json({ message: "Undefined __path." });
  }
  if (!req.query.name || !req.query.data) {
    return res.status(400).json({ message: "Undefined name or data." });
  }
  try {
    fs.writeFileSync(
      path.join(__path, `config/${req.query.name}.json`),
      req.query.data
    );
    return res.status(200).json(req.query.data);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
