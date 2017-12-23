'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Game = require('../models/games.js');

const gameRouter = module.exports = express.Router();

gameRouter.post('/games', jsonParser, (req, res, next) => {
  if(!req.body.name || !req.body.platforms){
    return(
      res.writeHead(400),
      res.write('Missing name and/or platform'),
      res.end()
    );
  }

  let newGame = new Game(req.body);
  newGame.save()
    .then(game => {
      res.send(game);
    })
    .catch(err => {
      next(err);
    });
});

gameRouter.get('/games', (req, res, next) => {
  Game.find({})
    .then(games => {
      res.send(games);
    })
    .catch(err => {
      next(err);
    });
});

gameRouter.get('/games/:id', (req, res, next) => {
  let id = req.params.id;
  if(!id){
    return(
      res.writeHead(400),
      res.write('ID required'),
      res.end()
    );
  }

  Game.findOne({_id: id})
    .then(game => {
      res.send(game);
    })
    .catch( () => {
      return(
        res.writeHead(404),
        res.write('game ID not found'),
        res.end()
      );
    });
});

gameRouter.delete('/games/:id', (req, res, next) => {
  let id = req.params.id;

  Game.remove({_id: id})
    .then( () => {
      res.send('Game deleted');
    })
    .catch( () => {
      return(
        res.writeHead(404),
        res.write('Game not found'),
        res.end()
      );
    });

});

gameRouter.delete('/games', (req, res, next) => {
  return (
    res.writeHead(400),
    res.write('ID required'),
    res.end()
  );
});
