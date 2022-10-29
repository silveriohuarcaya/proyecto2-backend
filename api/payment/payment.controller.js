const { makePayment, createPayment, createCustomer, retrieveCustomer } = require('./payment.service');
const { updateUser } = require('../user/user.service');

const { sendMailSendGrid } = require('../../utils/mail'); // Utilizando sendgrid

async function handlerPayment(req, res) {
  let { user } = req;
  const { paymentMethod, amount } = req.body;

  try {
    const { id, card } = paymentMethod;

    let customer = null;
    if (!user?.payment?.customerId || user?.payment?.customerId !== id) {
      customer = await createCustomer(user, paymentMethod);

      const userToUpdate = {
        payment: {
          customerId: customer.id,
          cards: [
            {
              paymentMethodId: id,
              brand: card.brand,
              country: card.country,
              expMonth: card.exp_month,
              expYear: card.exp_year,
              funding: card.funding,
              last4: card.last4,
            },
          ],
        },
      };
      user = await updateUser(user._id, userToUpdate);
    }

    customer = await retrieveCustomer(user.payment.customerId);

    const paymentCard = {
      id: user.payment.cards[0].paymentMethodId,
    };

    const payment = await makePayment({
      paymentMethod: paymentCard,
      amount,
      customer,
    });

    // save payment to db
    const registerPayment = {
      refId: payment.id,
      description: payment.description,
      value: payment.amount,
      currency: payment.currency,
      userId: user._id,
    };

    await createPayment(registerPayment);

    return res.json(payment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function sendEmailHandler(req, res, next) {
  const { email, url } = req.body;

  try {
    // send email to user
    const message = {
      from: '"no-reply" <corwilgi@hotmail.com>', // sender address
      to: email, // list of receivers

      subject: 'Shooping stripe', // Subject line

      template_id: 'd-04e1462b459f4052a63885892103631f',

      dynamic_template_data: {
        url: url,
      },
    };

    // await sendNodeMailer(message);
    await sendMailSendGrid(message);
    return res.status(200).json({ message: 'Success' });
    // return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = { handlerPayment, sendEmailHandler };
