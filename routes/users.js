const express = require('express');
const userController = require('../controllers/user-controller');
const { query, body, param, oneOf, validatorErrorChecker} = require('../middlewares/validator');
const { authorization, checkUserType } = require('../middlewares/authorize');
const router = express.Router();

/* GET users listing. */
router.post('/login',
  body('id').exists(),
  oneOf([
    body('type').equals('sys'),
    body('type').equals('oper'),
    body('type').equals('user'),
  ]),
  validatorErrorChecker,
  userController.login,
);

router.get('/me',
  authorization,
  checkUserType(['sys', 'oper']),
  userController.me,
);

module.exports = router;
