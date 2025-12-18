const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// Fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "..", "public")));

// Pour récupérer les données des formulaires
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); // Où sont les vues
hbs.registerPartials(path.join(__dirname, "views", "partials")); // Où sont les partials

// Initialisation de la DB avec des exemples
async function initDB() {
  const genresList = ["Action", "Aventure", "RPG", "Simulation", "Sport", "MMORPG"];
  
  // Crée les genres si y en a pas
  for (const name of genresList) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Crée un éditeur exemple si y en a pas
  const publisher = await prisma.publisher.upsert({
    where: { name: "Exemple Studio" },
    update: {},
    create: { name: "Exemple Studio" },
  });

  // Crée un jeu d'exemple si y en a pas
  const existingGame = await prisma.game.findFirst({ where: { title: "Super Jeu Exemple" } });
  if (!existingGame) {
    const genre = await prisma.genre.findFirst();
    await prisma.game.create({
      data: {
        title: "Super Jeu Exemple",
        description: "Ceci est un jeu mis en avant par défaut",
        releaseDate: new Date(),
        featured: true,
        genreId: genre.id,
        publisherId: publisher.id,
      },
    });
  }

  console.log("Genres et jeu d'exemple initialisés ✅");
}

// Lancer l'initialisation DB
initDB().catch(console.error);

// Routes
app.use("/", require("./routes/index.js")); // Accueil
app.use("/games", require("./routes/games.js")); // Tous les jeux
app.use("/publishers", require("./routes/publishers.js")); // Éditeurs
app.use("/genres", require("./routes/genres.js")); // Genres

// Page non trouvée (404)
app.use((req, res) => {
  res.status(404).render("errors/404", { layout: "main", url: req.originalUrl });
});

// Erreur serveur (500)
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err);
  res.status(500).render("errors/500", { layout: "main", error: err });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

module.exports = app;
