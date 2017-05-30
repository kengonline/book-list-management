var express = require('express');
var router = express.Router();
var firebase = require(__base + 'modules/firebase');
var expressValidator = require('express-validator');
var createPublisherSchema = require(__base + 'schemaValidators/createPublisherSchema');
var publisherService = require(__base + 'services/publisherService');

/* GET users listing. */
router.get('/:name', async function (req, res, next) {
  var result = await publisherService.get(req.params.name);
  res.send(result);
});

router.post('/', async function (req, res, next) {
  req.checkBody(createPublisherSchema);

  var errors = await req.getValidationResult();
  if (errors.array().length == 0) {
    var result = await publisherService.create(req.body);
    res.send(result);
  } else {
    res.send(errors.array());
  }
});

router.put('/:name', async function (req, res, next) {
  req.checkBody(createPublisherSchema);

  var errors = await req.getValidationResult();
  if (errors.array().length == 0) {
    var result = await publisherService.update(req.params.name, req.body);
    res.send(result);
  } else {
    res.send(errors.array());
  }
});

router.delete('/:name', async function (req, res, next) {
    var result = await publisherService.delete(req.params.name);
    res.send(result);
});

module.exports = router;
