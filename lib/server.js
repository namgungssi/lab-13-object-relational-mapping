
'use strict';

const express = require('express');
const mongoose = require('mongoose');

let app = express();
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/expressmongo', {useMongoClient: true});

app.use(require('../routes/gamesRoutes.js'));
app.use(require('../routes/platformRoutes.js'));

app.use( (req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
});

app.use(require('./middleware/error.js'));

let isRunning = false;

module.exports = {
  start: () => {
    return new Promise( (resolve, reject) => {
      if(!isRunning){

        app.listen(3000, err => {
          if(err){
            reject(err);
          } else {
            isRunning = true;
            resolve(console.log('Server up'));
          }
        });

      } else {

        reject(console.log('Server is already running'));

      }
    });
  },
  stop: () => {
    return new Promise( (resolve, reject) => {
      if(!isRunning){

        reject(console.log('Server is not running'));

      } else {

        app.close(err => {
          if(err){
            reject(err);
          } else {
            isRunning = false;
            resolve(console.log('Server off'));
          }
        });

      }
    });
  },
};
