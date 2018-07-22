
var express = require('express');
var app = express();
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/User');

// About page route.
router.get('/', function (req, res) {
  res.send('Home page for Users');
})

router.post('/signUp', function(req, res){
  console.log("signing up")
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user) => {
    if (err){
      console.log(err)
      res.json({success: false, msg: ' Failed to create user'});
    }
    else{
      const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: 604800 //1 week in seconds
      });

      res.json({success: true, token: 'JWT ' + token, msg: 'User is created'});
    }
  });
});

router.post('/signIn', function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  console.log('signing in with user info')

  User.getUserByUsername(username, (err, user) => {
    if (err){
      throw err;
    }
    if (!user ){
      return res.json({success: false, msg: "Could not find the user"});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err){
        console.log(err);
        throw err;
      }
      if (isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn:86400 //1 day in seconds
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            //can choose what to send
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          }
        });
      }
      else {
        return res.json({success: false, msg: "Wrong password"});
      }
    })
  })
});

//put passport.authenticate ('jwt', {session: false}) to protect route
router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res){
  console.log('finding profile information')
  res.json({user: req.user});
});

router.post('/deleteUser', passport.authenticate('jwt', {session: false}), function(req, res){
  console.log("deleting", req.user.username)
  User.deleteUser(req.user, (err) => {
    console.log("err", err)
    if (err){
      return res.json({success:false})
    }
    res.json({success: true})
  });
});

router.post('/addExpense', passport.authenticate('jwt', {session:false}), function(req, res){
  console.log('adding expense', req.body)
  User.addExpense(req.body, (err) => {
    if (err){
      return res.json({success:false})
    }
    res.json({success: true})
  });
});

router.post('/editExpense', passport.authenticate('jwt', {session:false}), function(req, res){
  console.log('editing expense', req.body)
  User.editExpense(req.body, (err) => {
    if (err){
      return res.json({success:false})
    }
    res.json({success: true})
  });
});

router.post('/removeExpense', passport.authenticate('jwt', {session:false}), function(req, res){
  console.log('removing expense', req.body)
  User.removeExpense(req.body, (err) => {
    if (err){
      return res.json({success:false})
    }
    res.json({success: true})
  });
});

router.post('/addIncome', passport.authenticate('jwt', {session:false}), function(req, res){
  console.log('adding income', req.body)
  User.addIncome(req.body, (err) => {
    if (err){
      return res.json({success:false})
    }
    res.json({success: true})
  });
});

router.post('/editIncome', passport.authenticate('jwt', {session:false}), function(req, res){
  console.log('editing income', req.body)
  User.editIncome(req.body, (err) => {
    if (err){
      return res.json({success:false})
    }
    res.json({success: true})
  });
});

router.post('/removeIncome', passport.authenticate('jwt', {session:false}), function(req, res){
  console.log('removing income', req.body)
  User.removeIncome(req.body, (err) => {
    if (err){
      return res.json({success:false})
    }
    res.json({success: true})
  });
});

module.exports = router;