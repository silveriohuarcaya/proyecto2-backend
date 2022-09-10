//hjsedf
const { Router } = require('express');

const {
  addCandidateHandler,
  getAllJobHandler,
  getByIdJobHandler,
  createJobHandler,
  updateJobHandler,
  deleteJobHandler,
} = require('./job.controller');

const router = Router();

router.get('/', getAllJobHandler);
router.get('/:id', getByIdJobHandler);
router.post('/', createJobHandler);
router.patch('/:id', updateJobHandler);
router.delete('/:id', deleteJobHandler);
router.patch('/:id/candidates', addCandidateHandler);

module.exports = router;
