const mongoose = require('mongoose');
const Cat = require('./cat.js');
const ownerSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  // job: {type: String, required: true},
  // cat: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cat'}],z
  catName: {type: String},
  cat: {type: mongoose.Schema.Types.ObjectId, ref: 'Cat'},
  birthday: {type: Date, default: Date.now},
});

ownerSchema.pre('save', function(done){
// console.log(this);
  Cat.find({name: this.catName})

  .then( cats => {
    let cat = cats[0];

    if( ! cat._id){
      throw new Error ('no owner');
    }
    this.cat = cat._id ;
    done();
  })
  .then( () => done())
  .catch(err => {console.log('this is our err' + err);
    done();
  });
});

ownerSchema.pre('findOne', function(done){
  this.populate({
    path:'cats',
  });
  done();
});

module.exports = mongoose.model('Owner', ownerSchema);
