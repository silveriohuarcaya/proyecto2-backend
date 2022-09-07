const jwt = require('jsonwebtoken');
//const compose = requeri('composable-middleware');
const { findUserByEmail } = require('../api/user/user.service');

async function isAuthenticated(req, res, next) {
  /*const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];*/

  const authheader = req.headers?.authorization;
  if (!authheader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authheader.split(' ')[1];

  // validate token
  const decoded = await verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // add user to request
  const { email } = decoded;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  req.user = user;

  return next();
  return;
}

function signToken(payload) {
  const token = jwt.sign(payload, 'EL_S#CR3TO_DE_AMOR', {
    expiresIn: '1h',
  });
  return token;
}

async function verifyToken(token) {
  try {
    const payload = await jwt.verify(token, 'EL_S#CR3TO_DE_AMOR');
    return payload;
  } catch (error) {
    return null;
  }
}
module.exports = {
  isAuthenticated,
  signToken,
  verifyToken,
};
