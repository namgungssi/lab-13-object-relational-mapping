'use strict';



const jsonParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').load();
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lab13', {useMongoClient:true});



const app = require('express')();
app.use(jsonParser.json())
app.use(require(__dirname + '/routes/pizza-routes.js'));
app.use(require(__dirname + '/routes/beer-routes.js'));
app.use((err,req,res,next) => {
  console.log(err);
  res.status( 500|| err.statusCode).send(err.message || 'server error');
});



app.listen(process.env.PORT || 3000);
