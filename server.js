const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ text: "hello world" });
});

app.post("/", (req, res) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({ errorMessage: "Bad Request" });
  }

  res.status(201).json(req.body);
});

app.listen(3000);
