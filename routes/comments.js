const expres = require('express');
const router = expres.Router();
const passport = require('passport');

const commentController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports = router;