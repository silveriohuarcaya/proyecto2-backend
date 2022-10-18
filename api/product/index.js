const { Router } = require('express');

const {
  getAllProductHandler,
  getByIdProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require('./product.controller');

const router = Router();

router.get('/', getAllProductHandler);
router.get('/:id', getByIdProductHandler);
router.post('/', createProductHandler);
router.patch('/:id', updateProductHandler);
router.delete('/:id', deleteProductHandler);

module.exports = router;
