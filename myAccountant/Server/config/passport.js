const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const User = require('../models/User');
const  config = require ('../config/database');

module.exports = function(passport){
    let opts = {};
    console.log("here")
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = config.secret;
     //runs this when submit jwt for authentication
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._id, (err, user)=>{
            if (err){
                return done(err, false);
            }
            if (user){
                return done(null, user);
            }
            else {
                return done(null, false)
            }
        });
    }));
}