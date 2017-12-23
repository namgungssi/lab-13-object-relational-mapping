'use strict';

const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  birthday: {type: Date, default: Date.now},
  favoriteDrug: {type: String, default: 'cat nip'},
  favoriteFood: {type: String, default: 'meow mix'},
  owner: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}],

});
module.exports = mongoose.model('Cat', catSchema);
