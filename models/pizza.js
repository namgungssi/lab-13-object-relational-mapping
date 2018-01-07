'use strict';



const mongoose = require('mongoose');



const pizzaSchema = new mongoose.Schema({
  name: {type: String, required: true},
  topping: {type: String, default: 'cheese'},
  price: {type: Number, min: 10},
});



const Pizza = module.exports = mongoose.model('Pizza', pizzaSchema);
