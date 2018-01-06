'use strict';



const mongoose = require('mongoose');
const Dog = require('./dog.js');
const ownerSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  dogName: {type: String},
  dog: {type: mongoose.Schema.Types.ObjectId, ref: 'Dog'},
  birthday: {type: Date, default: Date.now},
});


ownerSchema.pre('save', function(done){
  Dog.find({name: this.dogName})
    .then(dogs => {
      let dog = dogs[0];

      if(! dog._id){
        throw new Error ('missing owner');
      }

      this.dog = dog._id;
      done();
    })
    .then( () => done())
    .catch(err => {console.log('error' + err);
      done();
    });
});



ownerSchema.pre('findOne', function(done){
  this.populate({
    path:'dogs',
  });
  done();
});



module.exports = mongoose.model('Owner', ownerSchema);
