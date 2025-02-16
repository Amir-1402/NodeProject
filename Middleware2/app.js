const express = require("express");
const app = express();
const port = 3001;

const logger = require("./logger");
app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page ");
});

app.get(
  "/admin",
  (req, res, next) => {
    if (req.query.user !== "admin") {
      return res.status(403).send("Access Denied");
    }
    next();
  },
  (req, res) => {
    res.send("Welcome to the admin page");
  }
);

app.get("/public", (req, res) => {
  res.send("This is a public page.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});