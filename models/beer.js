'use strict';



const mongoose = require('mongoose');



const beerSchema = new mongoose.Schema({
  name: {type: String},
  price: {type: Number},
  Pizza_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pizza'},
});



module.exports = mongoose.model('beer', beerSchema);
