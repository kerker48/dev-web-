// src/app.js
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Routes
app.use("/", require("./routes/index.js"));

// Gestion 404
app.use((req, res) => {
  res.status(404).render("errors/404", { url: req.originalUrl });
});

// Gestion 500
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err);
  res.status(500).render("errors/500", { error: err });
});

module.exports = app;
