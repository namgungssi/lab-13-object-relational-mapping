'use strict';



const mongoose = require('mongoose');
const platformSchema = mongoose.Schema({
  name: {type: String, required: true},
});



module.exports = mongoose.model('platforms', platformSchema);
