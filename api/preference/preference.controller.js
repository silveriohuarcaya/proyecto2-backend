const mongoose = require('mongoose');
const mercadopago = require('mercadopago');
const { getAllPreference, createPreference } = require('./preference.service');
const { getByIdProduct } = require('../product/product.service');


// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

async function getAllPreferenceHandler(req, res) {
  try {
    const preferences = await getAllPreference();
    return res.status(200).json(preferences);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createPreferenceHandler(req, res) {
  const products = req.body;
  try {
    for (let i = 0; i < products.length; i++) {
      products[i] = await getByIdProduct(new mongoose.Types.ObjectId(products[i])).lean();
    }
    const order = await createPreference({ products });

    // Crea un objeto de preferencia
    const items = products.map((product) => ({
      title: product.name,
      unit_price: product.price,
      description: product.description,
      quantity: 1,
    }));

    const preference = {
      items,
      back_urls: {
        success: `${process.env.SMTP_FRONTEND_URL}/mercadopago/success`,
        failure: `${process.env.SMTP_FRONTEND_URL}/mercadopago/failure`,
        pending: `${process.env.SMTP_FRONTEND_URL}/mercadopago/pending`,
      },
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ order, preferenceId: response.body.id });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = { getAllPreferenceHandler, createPreferenceHandler };
