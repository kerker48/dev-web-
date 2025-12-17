# Vapeur

Vapeur est une application web permettant de gérer une collection de jeux vidéo.  
Elle permet de créer, modifier, supprimer et consulter des jeux, leurs genres et leurs éditeurs.  

L’application est construite avec **Node.js**, **Express.js**, **Handlebars (hbs)**, **Prisma** et une base de données **SQLite**.

---

## Table des matières
- [Installation](#installation)
- [Lancement](#lancement)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Licence](#licence)

---
Installation

Cloner le dépôt
git clone https://github.com/votre-utilisateur/vapeur.git
cd vapeur


Installer les dépendances
npm install

Déployer la base de données avec Prisma
npx prisma migrate deploy


⚠️ La base de données SQLite n’est pas commitée et sera générée lors de l’exécution des migrations.
Lancement

Pour lancer l’application en mode développement :
npm run start

Ensuite, rendez-vous sur http://localhost:3000 pour accéder à l’application.

Fonctionnalités

Vapeur permet de gérer :
  Jeux
  Titre
  Description
  Date de sortie
  Genre
  Éditeur


Mise en avant

Actions disponibles :
  Afficher la liste des jeux mis en avant sur la page d'accueil
  Afficher la liste de tous les jeux
  Créer un jeu
  Voir le détail d’un jeu (avec genre et éditeur)
  Modifier un jeu
  Supprimer un jeu
  Mettre un jeu en avant


Genres
  Nom
  Liste des jeux associés

Actions disponibles :
  Afficher la liste des genres
  Afficher la liste des jeux par genre
  
Les genres sont prédéfinis dans la base de données : Action, Aventure, RPG, Simulation, Sport, MMORPG. Ils sont automatiquement générés si absents.
Éditeurs
Nom


Liste des jeux associés

Actions disponibles :
  Créer un éditeur
  Afficher la liste des éditeurs
  Afficher la liste des jeux par éditeur
  Modifier un éditeur
  Supprimer un éditeur
