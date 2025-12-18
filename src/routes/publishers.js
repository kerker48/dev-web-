const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

//Liste des éditeurs
router.get("/", async (req, res) => {
  const publishers = await prisma.publisher.findMany({
    include: { games: true },
    orderBy: { name: "asc" },
  });
  res.render("publishers/list", { layout: "main", publishers });
});

//Formulaire création
router.get("/new", async (req, res) => {
  res.render("publishers/form", { layout: "main" });
});

//Création d'un éditeur
router.post("/new", async (req, res) => {
  const { name } = req.body;

  await prisma.publisher.create({ data: { name } });
  res.redirect("/publishers");
});

//Détail éditeur et ses jeux
router.get("/:id", async (req, res) => {
  const publisher = await prisma.publisher.findUnique({
    where: { id: Number(req.params.id) },
    include: { games: { include: { genre: true } } },
  });

  res.render("publishers/show", { layout: "main", publisher });
});

//Formulaire édition
router.get("/:id/edit", async (req, res) => {
  const publisher = await prisma.publisher.findUnique({
    where: { id: Number(req.params.id) },
  });

  res.render("publishers/form", { layout: "main", publisher });
});

//Modification
router.post("/:id/edit", async (req, res) => {
  const { name } = req.body;

  await prisma.publisher.update({
    where: { id: Number(req.params.id) },
    data: { name },
  });

  res.redirect(`/publishers/${req.params.id}`);
});

//Suppression
router.post("/:id/delete", async (req, res) => {
  await prisma.publisher.delete({
    where: { id: Number(req.params.id) },
  });
  res.redirect("/publishers");
});

module.exports = router;
