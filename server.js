const express = require("express");

const appA = express();
const appB = express();

const attachFirstPartyCookie = (req, res, next) => {
  res.cookie("name", "first_party_cookie", {
    httpOnly: true,
  });
  next();
};

const attachThirdPartyCookie = (req, res, next) => {
  res.cookie("name", "third_party_cookie", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  next();
};

appA.use(attachFirstPartyCookie);
appA.use(express.static("staticsA"));

appB.use(attachThirdPartyCookie);
appB.use(express.static("staticsB"));

appA.listen(3000);
appB.listen(3001);

const appC = express();

const allowCrossOriginAccess = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "Content-Type");
  }

  next();
};

appC.use(allowCrossOriginAccess);

appC.post("/", (req, res) => {
  res.status(200).json({ message: "Get Success!" });
});

appC.listen(3002);
