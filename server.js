const express = require("express");
const app = express();

const attachCookie = (req, res, next) => {
  res.cookie("name", "first_party_cookie", { httpOnly: true });
  next();
};

app.use(attachCookie);
app.use(express.static("statics"));

app.listen(3000);
