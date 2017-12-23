'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
//This is where we pull in json data^
const Cat = require(__dirname + '/../models/cat.js');

const catRouter = module.exports = express.Router();
//explain line ^
catRouter.get('/cats', (req, res, next) => {
  let myCats = {} ;
  Cat.find(myCats)
  .then(cat => res.send(cat))
  .catch(err => next({statusCode: 500, error: err}));
});
catRouter.get('/cats/:id', (req,res, next) => {
  Cat.findOne({_id : req.params.id})
  .then(cat => res.send(cat))
  .catch(err => next({statusCode: 404, message: 'This cat id isnt', error: err}));
});

catRouter.post('/cats', jsonParser, (req, res, next) =>{
  //parse the json coming in^
  let newCat = new Cat(req.body);
  newCat.save()
  //.save() returns a promise^
    .then(data => res.send(data))
    //getting the data from the db and sendinging it back a response^
    .catch(err => next({statusCode: 500, message: 'error creating cat', error: err}));
});

catRouter.put('/cats/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Cat.findOneAndUpdate({_id: req.params.id}, req.body)
  .then(data => res.send('success!'))
  .catch(err => next({error: error}));
});

catRouter.patch('/cats/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Cat.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
  .then(data => res.send('success!'))
  .catch(err => next({error: err}));
});

catRouter.delete('/cats/:id', (req, res, next) => {
  Cat.remove({_id: req.params.id})
  .then(data => res.send('Bye bye cat!'))
  .catch(err => next({error: err}));
});
