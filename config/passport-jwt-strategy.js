const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const User = require('../models/user');

let opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_secret_or_key
};

passport.use(new JWTStrategy(opts, async function(jwtPayload,done){

    let user = await User.findById(jwtPayload._id);
    try{
        if(user){
            return done(null,user);
        }
        return done(null,false);
    }catch(err){
        console.log('errror in finding user by help of JWT',err);

    }
}));

module.exports = passport;

