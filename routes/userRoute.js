var express = require('express');
var router = express.Router();
var firebase = require(__base + 'modules/firebase');
var expressValidator = require('express-validator');
var userSchema = require(__base + 'schemaValidators/userSchema');
var userService = require(__base + 'services/userService');

/* GET users listing. */
router.get('/:name', async function (req, res, next) {
  var result = await userService.get(req.params.name);
  res.send(result);
});

router.post('/', async function (req, res, next) {
  req.checkBody(userSchema.create);

  var errors = await req.getValidationResult();
  if (errors.array().length == 0) {
    var result = await userService.create(req.body);
    res.send(result);
  } else {
    res.send(errors.array());
  }
});

module.exports = router;
