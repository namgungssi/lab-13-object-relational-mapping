'use strict';



const express = require('express');
const jsonParser = require('body-parser').json();
const Dog = require(__dirname + '/../models/dog');
const dogRouter = module.exports = express.Router();



dogRouter.get('/dogs', (req, res, next) => {
  let myDogs = req.params || {};
  Dog.find(myDogs)
    .then(dog => res.send(dog))
    .catch(err => next({statusCode: 500, error: err}));
});



dogRouter.get('/dogs/:id', (req, res, next) => {
  Dog.findOne({_id : req.params.id})
    .then(dog => res.send(dog))
    .catch(err => next({statusCode: 404, message: 'dog id error', error: err}));
});



dogRouter.post('/dogs', jsonParser, (req, res, next) =>{
  let newDog = new Dog(req.body);
  newDog.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 400, message: 'error creating dog', error: err}));
});



dogRouter.put('/dogs/:id', jsonParser, (req, res, next) => {
  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'error request'});
  }
  delete req.body._id;
  Dog.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => res.send('successful update'))
    .catch(err => next({statusCode: 404, message: 'error request', error : err}));
});



dogRouter.patch('/dogs/:id', jsonParser, (req, res, next) => {
  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'error request'});
  }
  delete req.body._id;
  Dog.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(() => res.send('successful update'))
    .catch(err => next({statusCode: 404, message: 'error request', error: err}));
});



dogRouter.delete('/dogs/:id', (req, res, next) => {
  Dog.remove({_id: req.params.id})
    .then(() => res.send('dog deleted'))
    .catch(err => next({statusCode: 500, error: err}));
});
