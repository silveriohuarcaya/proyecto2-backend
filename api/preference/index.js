const { Router } = require('express');

const { getAllPreferenceHandler, createPreferenceHandler } = require('./preference.controller');

const router = Router();

router.get('/orders', getAllPreferenceHandler);
router.post('/orders', createPreferenceHandler);


module.exports = router;
