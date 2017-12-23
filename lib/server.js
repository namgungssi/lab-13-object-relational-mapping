'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/cats', {useMongoClient: true});

const app = module.exports = require('express')();


app.use('/api/v1', require('../routes/cat-router'));
app.use('/api/v1', require('../routes/owner-router'));
app.use((err, req, res, next) => {
  console.log(err.message);
  // console.log(err.error);
  //console log error from db
  res.status(err.statusCode || 500).send(err.message || 'server error');
  //send status code and message
  next();
});
