'use strict';



const express = require('express');
const jsonParser = require('body-parser').json();
const Owner = require(__dirname + '/../models/owner.js');
const ownerRouter = module.exports = express.Router();



ownerRouter.get('/owners', (req, res, next) => {
  let myOwners = {} ;
  Owner.find(myOwners).then(owner => res.send(owner)).catch(err => next({statusCode: 500, error: err}));
});



ownerRouter.get('/owners/:id', (req,res, next) => {
  Owner.findOne({_id : req.params.id}).then(owner => res.send(owner)).catch(err => next({statusCode: 404, message: 'This owner id isnt', error: err}));
});



ownerRouter.post('/owners', jsonParser, (req, res, next) =>{
  let newOwner = new Owner(req.body);
  console.log(newOwner);
  newOwner.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 500, message: 'error creating owner', error: err}));
});



ownerRouter.put('/owners/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Owner.findOneAndUpdate({_id: req.params.id}, req.body)
  .then(data => res.send('success!'))
  .catch(err => next({error: error}));
});



ownerRouter.patch('/owners/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Owner.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
  .then(data => res.send('success!'))
  .catch(err => next({error: err}));
});



ownerRouter.delete('/owners/:id', (req, res, next) => {
  Owner.remove({_id: req.params.id})
  .then(data => res.send('Bye bye owner!'))
  .catch(err => next({error: err}));
});
