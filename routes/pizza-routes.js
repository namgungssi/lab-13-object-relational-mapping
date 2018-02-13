'use strict';



const express = require('express');
const jsonParser = require('body-parser').json();
const Pizza = require(__dirname + '/../models/pizza');

const pizzaRouter = module.exports = express.Router();



pizzaRouter.get('/pizza', (req, res, next) => {
  let pizObj = req.params || {};
  Pizza.find(pizObj)
    .then(pizza => res.send(pizza))
    .catch(err => next({statusCode: 500, error: err}));
});


pizzaRouter.get('/pizza/:id', (req, res, next) => {
  Pizza.findOne({_id: req.params.id})
    .then(pizza => res.send(pizza))
    .catch(err => next({statusCode: 404, message: 'not found', error: err}));
});


pizzaRouter.post('/pizza', jsonParser, (req, res, next) => {

  let newPizza = new Pizza(req.body);

  newPizza.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 400, message: 'bad request', error: err}));
});


pizzaRouter.put('/pizza/:id', jsonParser, (req, res, next) => {
  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'bad request'});
  }
  delete req.body._id;
  Pizza.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => res.send('costume has been updated'))
    .catch(err => next({statusCode: 404, message: 'bad request', error: err}));
});


pizzaRouter.patch('/pizza/:id', jsonParser, (req, res, next) => {
  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'bad request'});
  }
  delete req.body._id;
  Pizza.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(() => res.send('pizza has been updated'))
    .catch(err => next({statusCode: 404, message: 'bad request', error: err}));
});


pizzaRouter.delete('/pizza/:id', (req, res, next) => {
  Pizza.remove({_id: req.params.id})
    .then(() => res.send('pizza has been deleted'))
    .catch(err => next({statusCode: 500, error: err}));
});
