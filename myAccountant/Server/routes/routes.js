
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
  console.log("signing Up")
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err){
      res.json({success: false, msg: ' Failed to create user'});
    }
    else{
      res.json({success: true, msg: 'User is created'});
    }
  });
});

router.post('/signIn', function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user ){
      return res.json({success: false, msg: "Could not find the user"});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 //1 week in seconds
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            //can choose what to send
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
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
  res.json({user: req.user});
});

module.exports = router;