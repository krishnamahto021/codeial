const express = require('express');
const userController = require('../controllers/user_controller');
const passport = require('passport');

const router = express.Router();

// to show the users
router.get('/profile/:id',passport.checkAuthentication,userController.profile);

// to update the user
router.post('/update/:id',passport.checkAuthentication,userController.update);

// to route the sign up and sign in page
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);



// use passport as middleware to authenticate the user
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

// creating route for signing out

router.get('/sign-out',userController.destroySession);

// creating route for google authentication
router.get('/auth/google',passport.authenticate('google',{scope:[ 'profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);



module.exports = router;