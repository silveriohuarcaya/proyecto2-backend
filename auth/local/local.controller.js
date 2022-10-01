const { findUserByEmail, findOneUser } = require('../../api/user/user.service');
const { createUserHandler } = require('../../api/user/user.controller');
const { signToken } = require('../auth.service');

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
  createUserHandler();
}

async function changePasswordHandler(req, res, next) {}

async function forgotPasswordHandler(req, res, next) {}

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

  res.json({ message: 'verifyAccountHandler' });
}

module.exports = {
  loginHandler,
  registerHandler,
  changePasswordHandler,
  forgotPasswordHandler,
  verifyAccountHandler,
};
