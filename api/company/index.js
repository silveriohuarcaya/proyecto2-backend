const { Router } = require('express');

const {
  getAllCompanyHandler,
  getByIdCompanyHandler,
  createCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
} = require('./company.controller');
const { isAuthenticated, hasRole } = require('../../auth/auth.service');

const router = Router();

router.get('/', getAllCompanyHandler);
router.get('/:id', getByIdCompanyHandler);
// router.post('/', isAuthenticated(), createCompanyHandler);
router.post('/', isAuthenticated, createCompanyHandler);
// router.patch('/:id', isAuthenticated(), updateCompanyHandler);
router.patch('/:id', isAuthenticated, updateCompanyHandler);
router.delete('/:id', hasRole(['admin', 'user']), deleteCompanyHandler);

module.exports = router;
