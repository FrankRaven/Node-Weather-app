const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("views", viewPath);
app.set("view engine", "hbs"); //used to set up handlebars and provide dynamic templates
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Harsh Vardhan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Information about 2B",
    name: "2B Best Girl",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help protect cute anime girls",
    para: "Join the axis cult",
    name: "Linkin Park",
  });
});

app.get("", (req, res) => {
  res.send("<h1>Weather</h1>");
});

app.get("/weather", (req, res) => {
  let address = req.query.address;
  if (!address) {
    return res.send({
      error: "Enter a locationr",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        Forecast: forecastData,
        latitude,
        longitude,
      });
    });
  });
});
// Location: "Indore",
// Forecast: "Its 33 degrees out",
// Address: req.query.address,

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Harsh Vardhan",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Harsh Vardhan",
    errorMessage: "Page not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
