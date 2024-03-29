const express = require('express');
const router = express.Router();
const userApi = require('../../../controllers/api/v1/users_api');

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));

module.exports = router;