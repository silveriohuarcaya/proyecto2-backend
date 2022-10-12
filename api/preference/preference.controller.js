// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

async function handlerPreference(req, res) {
  try {
    // Crea un objeto de preferencia
    let preference = {
      items: [
        {
          title: 'Mi producto',
          unit_price: 15000,
          quantity: 1,
        },
      ],
    };

    const response = await mercadopago.preferences.create(preference);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
module.exports = { handlerPreference };
