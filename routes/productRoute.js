const express = require('express');
const router = express.Router();
const firebase = require(__base + 'modules/firebase');
const expressValidator = require('express-validator');
const productService = require(__base + 'services/productService');
const productSchema = require(__base + 'schemaValidators/productSchema');

router.get('/search', async function (req, res, next) {
  res.send(req.query);
  // var result = await productService.search(req.query);
  // res.send(result);
});

router.get('/:name', async function (req, res, next) {
  var result = await productService.get(req.params.name);
  res.send(result);
});

router.post('/', async function (req, res, next) {
  req.checkBody(productSchema.create);

  var errors = await req.getValidationResult();
  if (errors.array().length == 0) {
    var result = await productService.create(req.body);
    res.send(result);
  } else {
    res.send(errors.array());
  }
});

router.put('/:name', async function (req, res, next) {
  // req.checkBody(productSchema.update);

  // var errors = await req.getValidationResult();
  // if (errors.array().length == 0) {
  //   var result = await productService.update(req.params.name, req.body);
  //   res.send(result);
  // } else {
  //   res.send(errors.array());
  // }
});

router.delete('/:name', async function (req, res, next) {
    // var result = await productService.delete(req.params.name);
    // res.send(result);
});

module.exports = router;