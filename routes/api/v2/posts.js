const express = require('express');
const router = express.Router();

const postApi2 = require('../../../controllers/api/v2/posts_api');
router.get('/',postApi2.index);

module.exports = router;