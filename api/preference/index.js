const { Router } = require('express');

const { getAllPreferenceHandler, createPreferenceHandler, createPreferenceWebhok } = require('./preference.controller');

const router = Router();

router.get('/orders', getAllPreferenceHandler);
router.post('/orders', createPreferenceHandler);
router.post('/', createPreferenceWebhok);


module.exports = router;
