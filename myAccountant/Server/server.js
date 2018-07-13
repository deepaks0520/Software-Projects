const request = require('request');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const users = require('./routes/routes.js');

var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');

//connects to the database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful' + config.database))
  .catch((err) => console.error(err));


const app = express();

//initializes bodyParser packages
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//initializes passport packages
app.use(passport.initialize());
app.use(passport.session());
//uses exported passport from passport.js
require('./config/passport')(passport);

//initializes use of cors package
app.use(cors());

//sets default path to public
app.use(express.static(path.join(__dirname, ' public')));

//sets the default port
app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
})

//home route
app.get('/', function (req, res) {
    console.log("here")
  res.send('Wiki home page');
})

//sets all routes to do with users to the /users route
app.use('/users', users);

