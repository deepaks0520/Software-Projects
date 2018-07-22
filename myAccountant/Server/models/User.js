var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
const config = require('../config/database');
var ObjectId = require('mongodb').ObjectID;


var UserSchema = new Schema({
  name: {
      type: String
  },
  email: { 
      type: String,
      unique: true,
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
  expense: [{
      name: String, 
      cost: Number, 
      date: Date, 
      category: String 
    }],
  income: [{
      name: String, 
      cost: Number, 
      date: Date, 
      category: String 
    }]

});

const User = module.exports = mongoose.model('User', UserSchema);

//to use functions outside
module.exports.getUserById = function(id, callback){
    console.log('finding user by id')
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    console.log('finding user by username')
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback){
    console.log('adding the user with encrypted password')
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
    console.log('verifying password')
    bcrypt.compare(userPassword, hash, (err, isMatch) =>{
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.deleteUser = function(user, callback){
    console.log('deleting user')
    var query  = { _id: new ObjectId(user._id) }; 
    User.remove(query, (err, result) => {
        if (err){
            throw err;
            console.log("failure", err);
        }
        console.log("success", result);
        callback(null)
        }); 
}

module.exports.addExpense = function(expenseObject, callback){
    console.log(expenseObject)
    var userInfo = {_id : new ObjectId(expenseObject.id) };
    var newExpense = { name: expenseObject.name, cost: expenseObject.cost, date: expenseObject.date, category: expenseObject.category};
    User.update( userInfo, {$push: {"expense": newExpense}}, (err, result) => {
        if (err){
            throw err;
            console.log("failure", err);
        }
        console.log("success", result);
        callback(null)
    })

    console.log('adding an expense')
}

module.exports.editExpense = function(expenseObject, callback){
    console.log(expenseObject)
    var userInfo = {_id : new ObjectId(expenseObject.id), "expense._id": expenseObject._id};
    User.update( userInfo, {$set: {"expense.$.name":expenseObject.name, "expense.$.cost":expenseObject.cost, "expense.$.date":expenseObject.date, "expense.$.category":expenseObject.category}}, (err, result) => {
        if (err){
            throw err;
            console.log("failure", err);
        }
        console.log("success", result);
        callback(null)
    })

    console.log('editing an expense')
}

module.exports.removeExpense = function(expenseObject, callback){
    console.log(expenseObject)
    var userInfo = {_id : new ObjectId(expenseObject.id) };
    var removedExpense = {_id: expenseObject.expenseID};
    User.update( userInfo, {$pull: {"expense": removedExpense}}, (err, result) => {
        if (err){
            throw err;
            console.log("failure", err);
        }
        console.log("success", result);
        callback(null)
    })

    console.log('removing an expense')
}

module.exports.addIncome = function(incomeObject, callback){
    console.log(incomeObject)
    var userInfo = {_id : new ObjectId(incomeObject.id) };
    var newIncome = { name: incomeObject.name, cost: incomeObject.cost, date: incomeObject.date, category: incomeObject.category};
    User.update( userInfo, {$push: {"income": newIncome}}, (err, result) => {
        if (err){
            callback(err);
            console.log("failure", err);
        }
        console.log("success", result);
        callback(null)
    })

    console.log('adding an income')
}

module.exports.editIncome = function(incomeObject, callback){
    console.log(incomeObject)
    var userInfo = {_id : new ObjectId(incomeObject.id), "income._id": incomeObject._id};
    User.update( userInfo, {$set: {"income.$.name":incomeObject.name, "income.$.cost":incomeObject.cost, "income.$.date":incomeObject.date, "income.$.category":incomeObject.category}}, (err, result) => {
        if (err){
            callback(err);
            console.log("failure", err);
        }
        console.log("success", result);
        callback(null)
    })

    console.log('editing an income')
}

module.exports.removeIncome = function(incomeObject, callback){
    console.log(incomeObject)
    var userInfo = {_id : new ObjectId(incomeObject.id) };
    var removedIncome = {_id: incomeObject.incomeID};
    User.update( userInfo, {$pull: {"income": removedIncome}}, (err, result) => {
        if (err){
            throw err;
            console.log("failure", err);
        }
        console.log("success", result);
        callback(null)
    })

    console.log('removing an income')
}