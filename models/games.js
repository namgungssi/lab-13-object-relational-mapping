'use strict';



const mongoose = require('mongoose');
const gameSchema = mongoose.Schema({
  name: {type: String, required: true},
  platforms: {type: String},
});



module.exports = mongoose.model('games', gameSchema);
