const express = require('express');
const router = express.Router();
const passport = require('passport');
const friendshipController = require('../controllers/friendhsip_controller');

router.get('/toggle/:id',passport.checkAuthentication,friendshipController.toggleFriendship);

module.exports = router;