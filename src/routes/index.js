const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

//Page d'accueil
router.get("/", async (req, res) => {
  try {
    const featured = await prisma.game.findMany({
      where: { featured: true },
      include: { genre: true, publisher: true },
      orderBy: { title: "asc" },
    });

    //On envoie les jeux mis en avant à la vue
res.render("home", { featured, layout: "main" });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/500", { error: err });
  }
});

module.exports = router;
