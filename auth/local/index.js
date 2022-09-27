const { Router } = require('express');
const {
  loginHandler,
  changePasswordHandler,
  forgotPasswordHandler,
  verifyAccountHandler,
} = require('./local.controller');

const router = Router();

router.post('/login', loginHandler);
//router.post('/change-password', changePasswordHandler);
//router.post('/forgot.password', forgotPasswordHandler);
router.get('/verify-account/:token', verifyAccountHandler);

module.exports = router;
