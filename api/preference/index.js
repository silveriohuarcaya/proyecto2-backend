const { Router } = require('express');

const {
  getAllPreferenceHandler,
  createPreferenceHandler,
  createPreferenceWebhook,
} = require('./preference.controller');

const router = Router();

router.get('/orders', getAllPreferenceHandler);
router.post('/orders', createPreferenceHandler);
router.post('/', createPreferenceWebhook);


module.exports = router;
