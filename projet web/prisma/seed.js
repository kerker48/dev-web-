const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const action = await prisma.genre.create({ data: { name: "Action" } });
  const rpg = await prisma.genre.create({ data: { name: "RPG" } });

  const nintendo = await prisma.publisher.create({ data: { name: "Nintendo" } });
  const squareEnix = await prisma.publisher.create({ data: { name: "Square Enix" } });

  await prisma.game.create({
    data: {
      title: "Zelda: Breath of the Wild",
      description: "Un jeu d'aventure en monde ouvert",
      releaseDate: new Date("2017-03-03"),
      featured: true,
      genreId: action.id,
      publisherId: nintendo.id,
    }
  });

  await prisma.game.create({
    data: {
      title: "Final Fantasy VII Remake",
      description: "RPG culte revisité",
      releaseDate: new Date("2020-04-10"),
      featured: false,
      genreId: rpg.id,
      publisherId: squareEnix.id,
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
