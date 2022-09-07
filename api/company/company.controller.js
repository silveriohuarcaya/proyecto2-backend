const bcrypt = require('bcryptjs');

const {
  getAllCompany,
  getByIdCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('./company.service');

async function getAllCompanyHandler(req, res) {
  try {
    const companies = await getAllCompany();
    return res.status(200).json(companies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getByIdCompanyHandler(req, res) {
  const { id } = req.params;
  try {
    const company = await getByIdCompany(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    return res.json(company);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createCompanyHandler(req, res) {
  const { name, description } = req.body;
  const { _id } = req.user;

  try {
    const company = await createCompany({ name, description, owner: _id });
    return res.status(201).json({ company });
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function updateCompanyHandler(req, res) {
  const { id } = req.params;
  const companyData = req.body;

  try {
    const company = await updateCompany(id, companyData);
    return res.status(200).json({ company });
  } catch (error) {
    return res.status(401).json({ error });
  }
}

async function deleteCompanyHandler(req, res) {
  const { id } = req.params;

  try {
    const company = await deleteCompany(id);
    return res.status(200).json({ message: 'Delete Company Successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllCompanyHandler,
  getByIdCompanyHandler,
  createCompanyHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
};
