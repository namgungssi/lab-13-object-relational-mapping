'use strict';



const express = require('express');
const bodyParser = require('body-parser').json();
const Pizza = require('../models/pizza.js');
const pizzaRouter = module.exports = express.Router();



pizzaRouter.get('/pizza', (req,res,next) => {
  let findObj = req.query || {};
  Pizza.find(findObj)
    .then(pizza => res.send({statusCode:200, message: pizza}))
    .catch(err => next({error:err}));
});



pizzaRouter.get('/pizza/:id', (req,res,next) => {
  Pizza.findOne({_id: req.params.id})
    .then(pizza => res.send(pizza))
    .catch(err => next({statusCode: 404}));
});



pizzaRouter.post('/pizza', bodyParser, (req,res,next) => {
  let newNewPizza = new Pizza(req.body);
  newNewPizza.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 400, message: 'error creating pizza', error:err}));
});



pizzaRouter.put('/pizza/:id', bodyParser, (req,res,next) => {
  delete req.body._id;
  Pizza.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(data => res.send('sucess'))
    .catch(err => next({statusCode: 404, error:err}));
});



pizzaRouter.delete('/pizza/:id', (req,res,next) => {
  Pizza.remove({_id: req.params.id})
    .then(data => res.send({statusCode: 200, message: 'item deleted'}))
    .catch(err => next({statusCode: 400, error:err}));
});
