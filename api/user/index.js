const { Router } = require('express');

const {
  getAllUserHandler,
  getByIdUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require('./user.controller');
const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

router.get('/', getAllUserHandler);
router.get('/:id', getByIdUserHandler);
router.post('/', createUserHandler);
router.patch('/:id', isAuthenticated, updateUserHandler);
router.delete('/:id', deleteUserHandler);

module.exports = router;
