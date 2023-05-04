const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

// authentication using passport 

passport.use(new LocalStrategy(
    {
        usernameField : 'email'
    },
    async function(email,password,done){
        // find a user and establish the identity
        const user = await User.findOne({email:email});
        try{
            if(!user){
                console.log('user not found!!');
                return done(null,false);
            }
            else if(user.password != password){
                console.log('Invalid password!!');
                return done(null,false);
            }

            return done(null,user);

        }catch(err){
            console.log('error in finding user ----> passport');
            return done(err);
        }
    }
    ));

    // serializing user to decide which key is to be kept in the cookies
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    //deserializing user from the key in the cookies

    passport.deserializeUser(async function(id,done){

        const user = await User.findById(id);
        try{
            return done(null,user);

        }catch(err){
            console.log("error in finding user ---> passport");
            return done(err);
        }
    });



    // check if the user is authenticated 
    passport.checkAuthentication = function(req,res,next){
        // if the user is signed in pass to next function that is user's controller
        if(req.isAuthenticated()){
            return next();
        }

        // if the user isnot signed in
        return res.redirect('/users/sign-in');
    }

    passport.setAuthenticatedUser = function(req,res,next){
        if(req.isAuthenticated()){
            // req.user contains the current signed in user and we are just sending it to the locals for views
            res.locals.user = req.user;
        }
        next();

    }

    module.exports = passport;



    