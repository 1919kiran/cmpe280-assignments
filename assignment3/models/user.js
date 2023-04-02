const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  image: String,
  medics: String,
  notes: String
});

var User = mongoose.model('Patient_detail', UserSchema);

module.exports = {
  User
};
