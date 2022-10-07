const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');

const { findUserByEmail } = require('../api/user/user.service');

async function isAuthenticated(req, res, next) {
  // return compose().use(async (req, res, next) => {

  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  // validate token
  const decoded = await verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // add user to request
  const { email } = decoded;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.user = user;

  next();
  return true;
  // }
}

function hasRole(roleRequired = []) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }
  return compose()
    .use(isAuthenticated)
    .use((req, res, next) => {
      const { role } = req.user;
      if (roleRequired.includes(role)) {
        next();
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
    });
}

function signToken(payload) {
  const token = jwt.sign(payload, 'EL_S#CR3T_DE_AMOR', { expiresIn: '1h' });

  return token;
}

async function verifyToken(token) {
  try {
    const payload = await jwt.verify(token, 'EL_S#CR3T_DE_AMOR');
    return payload;
  } catch (error) {
    return null;
  }
}

module.exports = {
  hasRole,
  isAuthenticated,
  signToken,
  verifyToken,
};
