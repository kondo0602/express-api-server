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
