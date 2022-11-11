const crypto = require('crypto');

const { findUserByEmail, findOneUser, updateUser } = require('../../api/user/user.service');
const { createUserHandler } = require('../../api/user/user.controller');
const { signToken } = require('../auth.service');

const { sendMailSendGrid } = require('../../utils/mail'); // Utilizando sendgrid

async function loginHandler(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        error: 'Email not found',
      });
    }
    const isMacth = await user.comparePassword(password);
    if (!isMacth) {
      return res.status(400).json({
        error: 'Password incorrect',
      });
    }
    const token = signToken({ email: user.email });

    return res.status(200).json({ token, profile: user.profile });
  } catch (error) {
    console.log(error);
  }
}

async function registerHandler(req, res, next) {
  createUserHandler(req, res);
}

async function changePasswordHandler(req, res, next) {}

async function forgotPasswordHandler(req, res, next) {
  const { email } = req.body;
  try {
    const users = await findUserByEmail(email);
    if (!users) {
      return res.status(400).json({
        error: 'Email not found',
      });
    }

    const hash = crypto.createHash('sha256').update(email).digest('hex');
    console.log('silverio', users);

    const userData = {
      passwordResetToken: hash,
      passwordResetExpires: Date.now() + 3_600_000 * 24, // 24 hours;
    };

    const user = await updateUser(users._id, userData);

    // send email to user
    const message = {
      from: 'El Puerto Escondido <corwilgi@hotmail.com>', // sender address
      to: user.email, // list of receivers

      subject: 'Reset password template', // Subject line

      template_id: 'd-64b3b1c7f261469991e1d4903c3e2135',

      dynamic_template_data: {
        firstName: user.profile.firstName.toUpperCase(),
        lastName: user.profile.lastName.toUpperCase(),
        url: `${process.env.SMTP_FRONTEND_URL}/verify-password/${hash}`,
      },
    };

    await sendMailSendGrid(message);
    return res.status(200).json({ profile: user.profile });
  } catch (error) {
    console.log(error);
  }
}

async function verifyAccountHandler(req, res, next) {
  const { token } = req.params;

  try {
    const user = await findOneUser({ passwordResetToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (Date.now() > user.passwordResetExpires) {
      return res.status(404).json({ message: 'Token expired' });
    }

    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    user.isActive = true;

    await user.save();

    const jwtoken = signToken({ email: user.email });

    return res.status(200).json({
      token: jwtoken,
      profile: user.profile,
      message: 'Account activated',
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
  // res.json({ message: 'verifyAccountHandler' });
}

// async function verifyEmailHandler(req, res, next) {
//   const { token } = req.params;

//   try {
//     const user = await findOneUser({ passwordResetToken: token });

//     if (!user) {
//       return res.status(404).json({ message: 'Invalid token' });
//     }

//     if (Date.now() > user.passwordResetExpires) {
//       return res.status(404).json({ message: 'Token expired' });
//     }

//     user.passwordResetToken = null;
//     user.passwordResetExpires = null;
//     user.isActive = true;

//     await user.save();

//     const jwtoken = signToken({ email: user.email });

//     return res.status(200).json({
//       token: jwtoken,
//       profile: user.profile,
//       message: 'Account activated',
//     });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }

//   res.json({ message: 'verifyAccountHandler' });
// }

module.exports = {
  loginHandler,
  registerHandler,
  changePasswordHandler,
  forgotPasswordHandler,
  verifyAccountHandler,
  // verifyEmailHandler,
};
