const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} ${req.method} ${req.path}`;

  fs.appendFile("server-log.js", log + "\n", err => {
    if (err) {
      console.log("Unable to write to the file");
    }
  });
  console.log(log);
  next();
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home",
    userName: "Ashutosh"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Something went wrong"
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
