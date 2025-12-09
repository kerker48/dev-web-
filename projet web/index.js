const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3008;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Page d'accueil
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Mon Site de Jeux</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <header>
        <h1>Bienvenue sur Mon Site de Jeux</h1>
        <nav>
          <a href="/">Accueil</a>
          <a href="/jeux">Tous les Jeux</a>
          <a href="/vedette">Jeux en Vedette</a>
        </nav>
      </header>
      <main>
        <h2>Explorez nos jeux</h2>
        <p>Choisissez une catégorie :</p>
        <a href="/jeux" class="btn">🎮 Voir tous les jeux</a>
        <a href="/vedette" class="btn">⭐ Jeux en vedette</a>
      </main>
      <footer>
        <p>&copy; 2025 Mon Site</p>
      </footer>
    </body>
    </html>
  `);
});

// Route : tous les jeux
app.get("/jeux", async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: { genre: true, publisher: true },
      orderBy: { title: "asc" },
    });

    let list = games.map(g => `<li>${g.title} - ${g.genre.name} - ${g.publisher.name}</li>`).join("");

    res.send(`
      <h1>Tous les Jeux</h1>
      <ul>
        <li>Zelda: Breath of the Wild - Action - Nintendo</li>
        <li>Final Fantasy VII Remake - RPG - Square Enix</li>
      </ul>
      <a href="/">Retour à l'accueil</a>

    `);
  } catch (err) {
    res.status(500).send(`<h1>Erreur</h1><pre>${err}</pre>`);
  }
});

// Route : jeux en vedette
app.get("/vedette", async (req, res) => {
  try {
    const featured = await prisma.game.findMany({
      where: { featured: true },
      include: { genre: true, publisher: true },
      orderBy: { title: "asc" },
    });

    let list = featured.map(f => `<li>${f.title} - ${f.genre.name} - ${f.publisher.name}</li>`).join("");

    res.send(`
      <h1>Jeux en Vedette</h1>
      <ul>${list}</ul>
      <a href="/">Retour à l'accueil</a>
    `);
  } catch (err) {
    res.status(500).send(`<h1>Erreur</h1><pre>${err}</pre>`);
  }
});

// Middleware 404
app.use((req, res) => {
  res.status(404).send(`<h1>404 - Page non trouvée</h1><a href="/">Retour à l'accueil</a>`);
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
