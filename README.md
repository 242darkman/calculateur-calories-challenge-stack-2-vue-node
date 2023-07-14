# Calculateur de Calories - Challenge Stack 2 Vue Node

## Membres du Groupe

- **VOUVOU Brandon**
- **KEITA Lansana**
- **NDONG Erica**
- **FAUVET Laura**

## Démarrage

### Préparation avant de démarrer le projet ou l'application

- Exécutez `yarn install` ou simplement `yarn` s'il n'y a pas de dossier **node_modules**

### Lancer l'application Backend et Frontend

- Allez à la racine du projet et exécutez la commande `yarn start`.

### Lancer l'application Backend

- Allez à la racine du projet Backend dans l'espace de travail du package et exécutez la commande `yarn start`.
- Le Backend sera lancé à l'adresse suivante : http://localhost:3200
- La documentation de l'API est disponible à l'adresse : http://localhost:3200/api-docs

### Lancer l'application Frontend

- Allez à la racine du projet Frontend dans l'espace de travail du package et exécutez la commande `yarn start`.
- Le Frontend sera lancé à l'adresse suivante : http://localhost:8080

## Description du projet et Fonctionnalités Implémentées

Cette application web propose d'analyser des recettes de cuisine. Elle fournit le nombre de calories théoriques d'une recette en se basant sur un référentiel d'ingrédients. Les fonctionnalités sont :

## Recettes

- Ajouter une recette : `POST api/recipe`
- Supprimer une recette : `DELETE api/recipe/{id}`
- Lister les recettes : `GET api/recipes`
- Afficher les détails d'une recette : `GET api/recipe/{id}`
- Analyser une recette : `GET api/recipe/{id}/analyze`
- Exporter la recette en JSON : `GET api/recipe/{id}/json`
- Générer une recette : `GET api/recipe/generate`
- Mettre à jour une recette : `PUT /api/recipe/{id}`

## Référentiel d'ingrédients

- Ajouter un ingrédient dans le référentiel : `POST /api/ingredientReferentiel`
- Modifier un ingrédient du référentiel : `PUT /api/ingredientReferentiel/{id}`
- Lister les ingrédients du référentiel : `GET /api/ingredientReferentiels`

## Etapes de préparation d'une recette

- Créer une étape avec un titre et une description : `POST /api/step`
- Récupérer toutes les étapes : `GET /api/steps`
- Modifier une étape : `PUT /api/step/{id}`
- Supprimer une étape : `DELETE /api/step/{id}`

## Utilisateurs

- Créer un compte : `POST /api/auth/register`
- Se connecter / Se déconnecter : `POST /api/auth/login`, `POST /api/auth/logout`
- Visualiser son profil : `GET /api/auth/me`
- Modifier son profil : `PUT /api/user/{id}`
- Supprimer son compte : `DELETE /api/user/{id}`

## Authentification

L'authentification dans cette application est gérée à l'aide de JWT (JSON Web Tokens). Lorsqu'un utilisateur se connecte avec succès, un JWT est généré et stocké dans un cookie. Cela permet de maintenir l'utilisateur authentifié pour les requêtes subséquentes nécessitant une authentification.

Voici un aperçu du flux d'authentification:

- Lorsqu'un utilisateur se connecte avec succès via l'endpoint `POST /api/auth/login`, le serveur génère un JWT à partir des informations utilisateur et d'une clé secrète.
- Le JWT généré est ensuite envoyé au client et stocké dans un cookie pour des raisons de sécurité.
- Chaque fois que l'utilisateur effectue une requête vers un endpoint nécessitant une authentification, le JWT est inclus dans le header de la requête.
- Le serveur valide le JWT inclus dans la requête. Si le JWT est valide, la requête est autorisée à procéder. Sinon, une erreur est renvoyée.
  Cette gestion des JWT assure que seuls les utilisateurs authentifiés ont accès à certaines routes de l'API, ajoutant une couche de sécurité supplémentaire à l'application.

Notez que pour se déconnecter, l'utilisateur peut simplement effacer le JWT de ses cookies, ou appeler l'endpoint `POST /api/auth/logout` qui effacera le JWT côté serveur.

Il est important de mentionner que les JWT sont des informations sensibles et doivent être traités avec soin. Ils ne doivent jamais être exposés publiquement et leur transmission entre le client et le serveur doit être sécurisée.

**Pour ajouter un JWT dans un cookie lors de l'utilisation de Postman, suivez ces étapes :**

1. Lancez Postman.
2. Sélectionnez la méthode HTTP pour votre requête (GET, POST, etc.) et entrez l'URL de l'API.
3. Sous l'URL de l'API, vous verrez une série d'onglets. Cliquez sur l'onglet "Headers".
4. Dans la section des headers, vous allez entrer le nom et la valeur de votre cookie. Dans la colonne "Key", entrez Cookie. Dans la colonne "Value", entrez le nom de votre cookie et le JWT, séparés par un égal (=). Par exemple, si le nom de votre cookie est access_token et que votre JWT est abc123, vous entreriez access_token=abc123.
5. Maintenant, vous pouvez envoyer votre requête. Le JWT sera inclus dans le header de la requête sous la forme d'un cookie.

### Variables d'environnement

Créer un fichier .env à la racine du dossier Backend avec les informations suivantes :

    ### PORT=3200
    ### DATABASE=mongodb+srv://testProf:<PASSWORD>@challengestackvnm.9ygjexz.mongodb.net/test?retryWrites=true&w=majority
    ### DB_USER=testProf
    ### DB_PASSWORD=TestProf
    ### SECRET="unSecretPasBienPrivate"
    ### REFRESH_TOKEN_SECRET="unSecretPasBienPrivatePourRefreshToken"

## Liste des technologies et leur version

- Nodejs - version : 18
- Express - version : 4
- Quasar - version : 2
- Mongoose - version : 7
- Swagger - version : 5

## Propositions d’amélioration de l'architecture

- Ajouter un système de droits ou de rôles pour limiter les actions en fonction des profils.
- Permettre la modification d'une recette.
- Permettre la modification des informations de l'utilisateur connecté.
- Export d'une recette au format csv

## Note

- Nous avons un système de filtre sur les tableaux des recettes et des ingrédients qui permet de rechercher un mot.
- Un système de pagination sur les tableaux.
- Un système de tri par ordre croissant et décroissant sur les tableaux.
