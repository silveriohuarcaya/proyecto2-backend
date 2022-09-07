const Job = require('./job.model');

function getAllJob() {
  return Job.find({});
}

function getByIdJob(id) {
  //return Job.findById(id).populate('company');
  return Job.findById(id)
    .populate('company', 'name description')
    .populate('candidates', 'firstName lastName');
}
function findJobByEmail(email) {
  return Job.findOne({ email: email });
}
function createJob(job) {
  return Job.create(job);
}
function updateJob(id, job) {
  return Job.findByIdAndUpdate(id, job, { new: true });
}
function deleteJob(id) {
  return Job.findByIdAndRemove(id);
}

function addCandidate(id, candidateId) {
  return Job.findByIdAndUpdate(
    id,
    { $push: { candidates: candidateId } },
    { new: true }
  );
}

module.exports = {
  getAllJob,
  getByIdJob,
  findJobByEmail,
  createJob,
  updateJob,
  deleteJob,
  addCandidate,
};
