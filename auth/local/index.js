const { Router } = require('express');

const {
  loginHandler,
  changePasswordHandler,
  forgotPasswordHandler,
  verifyAccountHandler,
  // verifyEmailHandler
} = require('./local.controller');
const { createUserHandler } = require('../../api/user/user.controller');

const router = Router();

router.post('/login', loginHandler);
router.post('/register', createUserHandler);
//router.post('/change-password', changePasswordHandler);
//router.post('/forgot.password', forgotPasswordHandler);
router.get('/verify-account/:token', verifyAccountHandler);
// router.get('/verify-email/:token', verifyEmailHandler);

module.exports = router;
