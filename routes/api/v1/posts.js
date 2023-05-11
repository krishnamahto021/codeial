const express = require('express');
const router = express.Router();

// require post api controller
const postApi = require('../../../controllers/api/v1/posts_api');

// require passport to authenticate
const passport = require('passport');


router.get('/',postApi.index);
router.delete('/:id',  passport.authenticate('jwt',{session:false}),postApi.destroy);


module.exports = router;