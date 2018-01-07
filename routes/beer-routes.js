'use strict';



const express = require('express');
const bodyParser = require('body-parser').json();
const Beer = require('../models/beer.js');
const Pizza = require('../models/pizza.js');
const beerRouter = module.exports = express.Router();



beerRouter.post('/beer', bodyParser, (req, res, next) => {
  new Beer(req.body).save()
    .then(data => res.send(data))
    .catch(err => next(err));
});


beerRouter.get('/beer', bodyParser, (req, res, next) => {
  new Beer(req.body).save()
    .then(data => res.send(data))
    .catch(err => next(err));
});


beerRouter.get('/beer', (req, res, next) => {
  let findObj = req.query || {};
  Beer.find(findObj)
    .then(data => res.send({statusCode:200, message: data}))
    .catch(err => next(err));
});


beerRouter.get('/beer/:id', (req, res, next) => {
  Beer.findOne({name: /Supreme/})
    .populate('Pizza_id')
    .exec(function(err, Beer) {
      if(err) return new Error('err');
    })
    .then(beer => res.send(beer))
    .catch(err => next(err));
});


beerRouter.put('/beer/:id', bodyParser, (req, res, next) => {
  delete req.body._id;
  Beer.findOneAndUpdate({Pizza_id: req.params.Pizza_id}, req.body)
    .then(data => res.send('success'))
    .catch(err => next({statusCode: 404, error:err}));
});


beerRouter.delete('/beer/:id', (req, res, next) => {
  Beer.remove({_id: req.params.Pizza_id})
    .then(data => res.send({statusCode: 200, message: 'item deleted'}))
    .catch(err => next({statusCode: 400, error:err}));
});
