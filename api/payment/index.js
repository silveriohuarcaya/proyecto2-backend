const { Router } = require('express');

const { handlerPayment, sendEmailHandler } = require('./payment.controller');
const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

router.post('/', isAuthenticated, handlerPayment);
router.post('/sendEmail', sendEmailHandler);

module.exports = router;
