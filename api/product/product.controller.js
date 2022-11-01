const bcrypt = require('bcryptjs');
const { verifyToken } = require('../../auth/auth.service');
const crypto = require('crypto');

const {
  getAllProduct,
  getByIdProduct,
  findProductByEmail,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./product.service');
// const { sendNodeMailer } = require('../../utils/mail'); // Utilizando nodemailer
const { sendMailSendGrid } = require('../../utils/mail'); // Utilizando sendgrid

async function getAllProductHandler(req, res) {
  try {
    const products = await getAllProduct();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getByIdProductHandler(req, res) {
  const { id } = req.params;
  try {
    const product = await getByIdProduct(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { profile } = product.profile;

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createProductHandler(req, res) {
  const productData = req.body;

  // const { authorization } = req.headers;

  // const token = authorization?.split(' ')[1];

  try {
    // const payload = await verifyToken(token);

    const product = await createProduct(productData);

    // return res.status(200).json({ token, product });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateProductHandler(req, res) {
  const { id } = req.params;
  const productData = req.body;

  try {
    const product = await updateProduct(id, productData);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteProductHandler(req, res) {
  const { id } = req.params;

  try {
    const product = await deleteProduct(id);
    return res.status(200).json({ message: 'Delete Product Successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllProductHandler,
  getByIdProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
