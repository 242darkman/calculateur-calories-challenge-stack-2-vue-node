# challenge-stack-2-vue-node

Calculateur de calories

# Membres du groupe

- **_VOUVOU Brandon_**
- **_KEITA Lansana_**
- **_NDONG Erica_**
- **_FAUVET Laura_**

# Démarrage

## Before starting the project or app

- Run `yarn install` or `yarn` if there is no **_node_modules_**

## Run backend and frontend app

- Go to the project root and run the `yarn start` command.

## Run backend

- Go to the root of the backend project in package's workspace and issue the command `yarn start`.

## Run frontend

- Go to the root of the frontend project in package's workspace and issue the command `yarn start`.

# Description du projet et fonctionnalités implémentées

Cette application web propose d'analyser des recettes de cuisine. Elle fournit le nombre de calories théoriques d'une recette en se basant sur un référentiel d'ingrédients. Ses fonctionnalités sont les suivantes :

## Recettes

- Ajouter une recette en renseignant le titre, les ingrédients et les étapes à suivre
- Supprimer une recette
- Lister les recettes
- Afficher les détails d'une recette
- Analyser une recette
- Exporter la recette en JSON

## Référentiel d'ingrédients

- Ajouter un ingrédient dans le référentiel en donnant son nom, le nombre de calories et les protéines
- Modifier un ingrédient du référentiel
- Modifier un ingrédient du référentiel
- Lister les ingrédients du référentiel

## Utilisateur

- Créer un compte
- Se connecter / Se déconnecter
- Visualiser son profil
- Modifier son profil
- Supprimer son compter

## Contrainte user interface

S'il n'est pas authentifié, user n'a pas la possibilité de voir les buttons de création de recettes et de l'ingrédients

## Variable d'environnement

Créer un fichier .env à la racine du dossier backend avec les informations suivantes : 

	### PORT=3200
	### DATABASE=mongodb+srv://testProf:<PASSWORD>@challengestackvnm.9ygjexz.mongodb.net/test?retryWrites=true&w=majority
	### DB_USER=testProf
	### DB_PASSWORD=TestProf
	### SECRET="unSecretPasBienPrivate"
	### REFRESH_TOKEN_SECRET="unSecretPasBienPrivatePourRefreshToken"

## Liste des technologies et leur version

	### Nodejs 	- version : 18
	### Express 	- version : 4
	### Quasar 	- version : 2
	### Mongoose	- version : 7 
	### Swagger 	- version : 5

## Propositions d’évolution de l’architecture

- Nous avons mis en place des routes permettant à un utilisateur de créer plusieurs étapes et ingrédients réutilisables lors de la création d'une recette, cela implique qu'il faut les crées avant la recette.
- Ajouter un système de droit ou rôle pour garantir le bon fonctionnement et limiter les actions selon les profils
- Modification d'une recette
- Modification des informations de l'utilisateur connecté


## NB: 
- nous avons un système de filtre sur le tableau des recettes et référentiels qui permet de rechercher un mot 
- un Systeme de pagination sur les tableaux
- un système de tri par ordre croissant et décroissant sur les tableaux