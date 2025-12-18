const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

//Liste des genres
router.get("/", async (req, res) => {
  try {
    const genres = await prisma.genre.findMany({
      include: { games: true },
      orderBy: { name: "asc" },
    });

    res.render("genres/index", { layout: "main", genres });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/500", { layout: "main", error: err });
  }
});

//Détails d'un genre et ses jeux
router.get("/:id", async (req, res) => {
  try {
    const genre = await prisma.genre.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { games: { include: { publisher: true } } },
    });

    if (!genre) return res.status(404).render("errors/404", { layout: "main", url: req.originalUrl });

    res.render("genres/show", { layout: "main", genre });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/500", { layout: "main", error: err });
  }
});

module.exports = router;
