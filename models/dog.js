'use strict';



const mongoose = require('mongoose');



const dogSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  birthday: {type: Date, default: Date.now},
  favoriteFood: {type: String, default: 'steak'},
  owner: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}],

});



module.exports = mongoose.model('Dog', dogSchema);
