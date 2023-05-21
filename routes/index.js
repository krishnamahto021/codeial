const express = require('express');
const homeController = require('../controllers/home_controller');

const router = express.Router();
//console.log('router loaded');

router.get('/',homeController.home); // to access home controller
router.use('/users',require('./users')); // to access all the controller when routes start from /users
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));

// to use api
router.use('/api',require('./api'));





module.exports = router;