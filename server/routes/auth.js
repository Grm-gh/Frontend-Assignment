const express = require('express');
const router = express.Router();

const { signupValidation, loginValidation } =
  require('../middleware/Authvalidation');
const { signup, login } =
  require('../Controllers/AuthController');

router.post('/register', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
