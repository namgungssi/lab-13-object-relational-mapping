'use strict';



const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/dog', {useMongoClient: true});



const app = module.exports = require('express')();



app.use('/api/v1', require('../routes/dog-router'));
app.use('/api/v1', require('../routes/owner-router'));
app.use((err, req, res, next) => {
  console.log(err.message);

  res.status(err.statusCode || 500).send(err.message || 'server error');

  next();
});
