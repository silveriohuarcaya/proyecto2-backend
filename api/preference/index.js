const { Router } = require('express');

const { handlerPreference } = require('./preference.controller');
// const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

router.post('/', handlerPreference);

module.exports = router;
