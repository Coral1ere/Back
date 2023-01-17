const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Permet d'accéder au path du serveur
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

// Helmet sécurise les entêtes HTTP
const helmet = require("helmet");

// Atténue les attaques de script intersite
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);

// Améliore la confidentialité des utilisateurs
app.use(
  helmet.dnsPrefetchControl({
    allow: true,
  })
 );

app.use((req, res, next) => {
    //Toutes les origines peuvent accéder à l'API
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Ajoute les headers nécessaires aux requêtes envoyées à l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //Permet d'envoyer les différentes requêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

//Gère la ressource "images" de manière statique à chaque fois qu'elle reçoit une requête vers la route "/images"
app.use('/images', express.static(path.join(__dirname, 'images')));

//Route de base commune aux sauces ou à l'authentification
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//Les intrus peuvent utiliser cet en-tête (activé par défaut) afin de détecter les applications qui exécutent Express et lancer ensuite des attaques spécifiquement ciblées.
app.disable('x-powered-by');

module.exports = app;