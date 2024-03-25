const express = require('express');
const { query, param, validatorErrorChecker} = require('../middlewares/validator');
const router = express.Router();
const indexController = require('../controllers/index-controller');
const {authorization, checkUserType} = require('../middlewares/authorize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test/:uid',
  authorization,
  checkUserType(['sys', 'oper']),
  param('uid').isNumeric(),
  query('ttt').isNumeric(),
  query('aaa').exists(),
  validatorErrorChecker,
  indexController.indexController,
);

module.exports = router;
