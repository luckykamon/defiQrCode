const rootRouterEquipe = require('express').Router();

rootRouterEquipe.use('/', require('./index.router'));
rootRouterEquipe.use('/api/equipe', require('./equipe/equipe.route'));

module.exports = rootRouterEquipe;
