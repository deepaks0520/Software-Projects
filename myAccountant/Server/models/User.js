var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
const config = require('../config/database');

var UserSchema = new Schema({
  name: {
      type: String
  },
  email: { 
      type: String,
      required: true
  },
  username: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },


});

const User = module.exports = mongoose.model('User', UserSchema);

//to use functions outside
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback){
    //random key for hashing
    bcrypt.genSalt(10, (error, salt)=> {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(userPassword, hash, callback){
    bcrypt.compare(userPassword, hash, (err, isMatch) =>{
        if (err) throw err;
        callback(null, isMatch);
    });
}