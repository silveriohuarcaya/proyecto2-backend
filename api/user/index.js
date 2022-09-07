const { Router } = require('Express');

const {
  getAllUserHandler,
  getByIdUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require('./user.controller');

const router = Router();

router.get('/', getAllUserHandler);
router.get('/:id', getByIdUserHandler);
router.post('/', createUserHandler);
router.patch('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

module.exports = router;
