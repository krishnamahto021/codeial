const express = require('express');
const router = express.Router();
const userApi = require('../../../controllers/api/v1/users_api');

router.use('/posts',require('./posts'));
router.post('/create-session',userApi.createSession);

module.exports = router;