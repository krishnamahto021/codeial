const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,postController.create);// to make post form visible only when the user is signed in
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);// to destroy post and all the realted comments
router.use('/like')



module.exports = router;