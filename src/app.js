const path = require("path");
const express = require("express");
const hsb = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

// Define path for Express config
const viewsPath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hsb.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

// Route handler
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Shawn Hu",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Shawn Hu",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "This is the help page",
        name: "Shawn Hu",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide a location.",
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get("/product", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query.search);
    res.send({ product: [] });
});

app.get("/help/*", (req, res) => {
    res.render("404", { title: "404", message: "Help article not found", name: "Shawn Hu" });
});

app.get("*", (req, res) => {
    res.render("404", { title: "404", message: "Page not found", name: "Shawn Hu" });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
