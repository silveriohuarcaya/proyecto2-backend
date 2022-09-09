const { populate } = require('./company.model');
const Company = require('./company.model');

function getAllCompany() {
  return Company.find({});
}

function getByIdCompany(id) {
  return Company.findById(id).populate('owner');
}
function findCompanyByEmail(email) {
  return Company.findOne({ email: email });
}
function createCompany(company) {
  return Company.create(company);
}
function updateCompany(id, company) {
  return Company.findByIdAndUpdate(id, company, { new: true });
}
function deleteCompany(id) {
  return Company.findByIdAndRemove(id);
}
module.exports = {
  getAllCompany,
  getByIdCompany,
  findCompanyByEmail,
  createCompany,
  updateCompany,
  deleteCompany,
};
