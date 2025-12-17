# Vapeur

Vapeur est une application web permettant de gérer une collection de jeux vidéo.  
Elle permet de créer, modifier, supprimer et consulter des jeux, leurs genres et leurs éditeurs.  

L’application est construite avec **Node.js**, **Express.js**, **Handlebars (hbs)**, **Prisma** et une base de données **SQLite**.

---

## Table des matières
- [Installation](#installation)
- [Lancement](#lancement)
- [Fonctionnalités](#fonctionnalités)

---
## Installation

1. **Cloner le dépôt**  

```bash
git clone https://github.com/votre-utilisateur/vapeur.git
cd vapeur


Installer les dépendances
npm install

Déployer la base de données avec Prisma
npx prisma migrate deploy


⚠️ La base de données SQLite n’est pas commitée et sera générée lors de l’exécution des migrations.

---


## 2. **Lancement** (`#lancement`)  
Indique comment lancer l’app localement :  

```markdown
## Lancement

Pour lancer l’application en mode développement :

```bash
npm start

Ensuite, rendez-vous sur http://localhost:3000 pour accéder à l’application.

---


## 3. **Fonctionnalités** (`#fonctionnalités`)  
Liste ce que l’utilisateur peut faire :  

```markdown
## Fonctionnalités

### Jeux
- Titre, description, date de sortie, genre, éditeur, mise en avant
- Créer, modifier, supprimer un jeu
- Voir le détail d’un jeu
- Mettre un jeu en avant

### Genres
- Nom, liste des jeux associés
- Afficher tous les genres
- Afficher les jeux par genre

### Éditeurs
- Nom, liste des jeux associés
- Créer, modifier, supprimer un éditeur
- Afficher tous les éditeurs
- Afficher les jeux par éditeur

