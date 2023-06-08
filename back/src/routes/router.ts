const rootRouterEquipe = require('express').Router();

rootRouterEquipe.use('/api/equipe', require('./equipe/equipe.route'));

module.exports = rootRouterEquipe;
