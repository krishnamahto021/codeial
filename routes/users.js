const express = require('express');
const userController = require('../controllers/user_controller');
const passport = require('passport');

const router = express.Router();
router.get('/profile',passport.checkAuthentication,userController.profile);

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


module.exports = router;