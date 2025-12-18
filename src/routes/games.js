const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

//Liste des jeux
router.get("/", async (req, res) => {
  const games = await prisma.game.findMany({
    include: { genre: true, publisher: true },
    orderBy: { title: "asc" },
  });
  res.render("games/list", { layout: "main", games });
});

//Formulaire création
router.get("/new", async (req, res) => {
  const genres = await prisma.genre.findMany();
  const publishers = await prisma.publisher.findMany();
  res.render("games/form", { layout: "main", genres, publishers });
});

//Création d'un jeu
router.post("/new", async (req, res) => {
  const { title, description, releaseDate, genreId, publisherId, featured } = req.body;

  await prisma.game.create({
    data: {
      title,
      description,
      releaseDate: releaseDate ? new Date(releaseDate) : null,
      genreId: Number(genreId),
      publisherId: Number(publisherId),
      featured: featured === "on",
    },
  });

  res.redirect("/games");
});

//Détail d'un jeu
router.get("/:id", async (req, res) => {
  const game = await prisma.game.findUnique({
    where: { id: Number(req.params.id) },
    include: { genre: true, publisher: true },
  });
  res.render("games/show", { layout: "main", game });
});

//Formulaire édition
router.get("/:id/edit", async (req, res) => {
  const game = await prisma.game.findUnique({
    where: { id: Number(req.params.id) },
  });
  const genres = await prisma.genre.findMany();
  const publishers = await prisma.publisher.findMany();

  res.render("games/form", { layout: "main", game, genres, publishers });
});

//Modification d'un jeu
router.post("/:id/edit", async (req, res) => {
  const { title, description, releaseDate, genreId, publisherId, featured } = req.body;

  await prisma.game.update({
    where: { id: Number(req.params.id) },
    data: {
      title,
      description,
      releaseDate: releaseDate ? new Date(releaseDate) : null,
      genreId: Number(genreId),
      publisherId: Number(publisherId),
      featured: featured === "on",
    },
  });

  res.redirect(`/games/${req.params.id}`);
});

//Suppression d'un jeu
router.post("/:id/delete", async (req, res) => {
  await prisma.game.delete({
    where: { id: Number(req.params.id) },
  });
  res.redirect("/games");
});

module.exports = router;
