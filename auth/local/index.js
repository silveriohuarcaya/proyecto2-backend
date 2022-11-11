const { Router } = require('express');

const {
  loginHandler,
  registerHandler,
  changePasswordHandler,
  forgotPasswordHandler,
  verifyAccountHandler,
  // verifyEmailHandler
} = require('./local.controller');

const router = Router();

router.post('/login', loginHandler);
router.post('/register', registerHandler);
//router.post('/change-password', changePasswordHandler);
router.post('/forgot-password', forgotPasswordHandler);
router.get('/verify-account/:token', verifyAccountHandler);
// router.get('/verify-email/:token', verifyEmailHandler);

module.exports = router;
