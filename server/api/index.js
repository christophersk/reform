const express = require('express');
const router = express.Router();

router.use('/forms', require('./forms'));
router.use('/filledforms', require('./filledforms'));
router.use('/questions', require('./questions'));
router.use('/entities', require('./entities'));
router.use('/answers', require('./answers'));

module.exports = router;
