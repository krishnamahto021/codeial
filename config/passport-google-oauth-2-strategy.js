const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID:'15098916937-p7qq04kehn4dqamb27u0ds8br7m6rda6.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
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
