const fs = require("fs");
const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const WHITE = "\x1b[37m";
const CYAN = "\x1b[36m";

let router = express.Router();
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
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

router.post("/setWorkingPath", (req, res) => {
  if (!req.body) {
    return res.status(500).json({ message: "Undefined req.body." });
  }
  if (!req.body.path) {
    return res.status(400).json({ message: "Undefined path." });
  }
  __path = req.body.path;
  res.status(200).json({ path: __path });
});

router.get("/getConfigJSON", (req, res) => {
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

router.post("/saveConfigJSON", (req, res) => {
  if (!__path) {
    return res.status(400).json({ message: "Undefined __path." });
  }
  if (!req.body) {
    return res.status(500).json({ message: "Undefined req.body." });
  }
  if (!req.body.name || !req.body.data) {
    return res.status(400).json({ message: "Undefined name or data." });
  }
  try {
    fs.writeFileSync(
      path.join(__path, `config/${req.body.name}.json`),
      req.body.data
    );
    return res.status(200).json(req.body.data);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
