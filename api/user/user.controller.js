const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../../auth/auth.service');

const {
  getAllUser,
  getByIdUser,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require('./user.service');

async function getAllUserHandler(req, res) {
  try {
    const users = await getAllUser();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getByIdUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getByIdUser(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profile;

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createUserHandler(req, res) {
  const userData = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  try {
    const payload = await verifyToken(token);

    if (userData.password && userData.password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const user = await createUser(userData);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateUserHandler(req, res) {
  const { id } = req.params;
  const userData = req.body;

  try {
    if (!userData.password) {
      const user = await updateUser(id, userData);
      return res.status(200).json(user);
    } else if (userData.password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      const user = await updateUser(id, userData);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        error: `password ${userData.password} is shorter than the minimum allowed length (6)`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.params;

  try {
    const user = await deleteUser(id);
    return res.status(200).json({ message: 'Delete User Successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllUserHandler,
  getByIdUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
