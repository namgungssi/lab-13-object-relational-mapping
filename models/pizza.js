'use strict';



const mongoose = require('mongoose');
const pizzaSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  profile: String,
  parts: {type: Array},
  createDate: {type: Date, default: Date.now},
});



const Pizza = module.exports = mongoose.model('Pizza', pizzaSchema);
