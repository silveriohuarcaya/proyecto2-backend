const bcrypt = require('bcryptjs');

const {
  addCandidate,
  getAllJob,
  getByIdJob,
  findJobByEmail,
  createJob,
  updateJob,
  deleteJob,
} = require('./job.service');

async function getAllJobHandler(req, res) {
  try {
    const jobs = await getAllJob();
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getByIdJobHandler(req, res) {
  const { id } = req.params;
  try {
    const job = await getByIdJob(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.json(job);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createJobHandler(req, res) {
  const jobData = req.body;

  try {
    const job = await createJob(jobData);
    return res.status(201).json({ job });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateJobHandler(req, res) {
  const { id } = req.params;
  const jobData = req.body;

  try {
    const job = await updateJob(id, jobData);
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteJobHandler(req, res) {
  const { id } = req.params;

  try {
    const job = await deleteJob(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.json(job);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function addCandidateHandler(req, res) {
  const { id } = req.params;
  const { candidateId } = req.body;

  try {
    const job = await addCandidate(id, candidateId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.status(201).json(job);
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  addCandidateHandler,
  getAllJobHandler,
  getByIdJobHandler,
  createJobHandler,
  updateJobHandler,
  deleteJobHandler,
};
