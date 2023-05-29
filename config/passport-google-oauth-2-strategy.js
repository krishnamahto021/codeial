const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL
    },
    async function (accessToken, refreshToken, profile, done) {
        try {
            // console.log(profile);
            let user = await User.findOne({ email: profile.emails[0].value }).exec();
            if (user) {
                // if user is present set it to req.user
                return done(null, user);
            } else {
                // if not present create the user and then set it to the req.user
                let newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null, newUser);
            }
        } catch (err) {
            console.log('error in passport---->google-oauth', err);
            return done(err);
        }
    }
));

module.exports = passport;
