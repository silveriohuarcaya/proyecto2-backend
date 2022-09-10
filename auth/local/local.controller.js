const { findUserByEmail } = require('../../api/user/user.service');
const { signToken } = require('../../auth/auth.service');

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

async function changePasswordHandler(req, res, next) {}

async function forgotPasswordHandler(req, res, next) {}

async function verifyAccountHandler(req, res, next) {}

module.exports = {
  loginHandler,
  changePasswordHandler,
  forgotPasswordHandler,
  verifyAccountHandler,
};
