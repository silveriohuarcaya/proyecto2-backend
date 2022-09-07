const { Router } = require('Express');
const { isAuthenticated } = require('../../auth/auth.service');

const {
  getAllCompanyHandler,
  getByIdCompanyHandler,
  createCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
} = require('./company.controller');

const router = Router();

router.get('/', getAllCompanyHandler);
router.get('/:id', getByIdCompanyHandler);
router.post('/', isAuthenticated, createCompanyHandler);
router.patch('/:id', isAuthenticated, updateCompanyHandler);
router.delete('/:id', isAuthenticated, deleteCompanyHandler);

module.exports = router;
