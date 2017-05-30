var express = require('express');
var router = express.Router();

router.use('/users', require(__base + '/routes/userRoute'));
router.use('/publishers', require(__base + '/routes/publisherRoute'));

module.exports = router;
