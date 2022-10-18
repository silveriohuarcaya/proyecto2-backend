const Product = require('./product.model');

function getAllProduct() {
  return Product.find({});
}

function getByIdProduct(id) {
  return Product.findById(id);
}
function findProductByEmail(email) {
  return Product.findOne({ email: email });
}
function findOneProduct(query) {
  return Product.findOne(query);
}
function createProduct(product) {
  return Product.create(product);
}
function updateProduct(id, product) {
  return Product.findByIdAndUpdate(id, product, { new: true });
}
function deleteProduct(id) {
  return Product.findByIdAndRemove(id);
}
module.exports = {
  getAllProduct,
  getByIdProduct,
  findOneProduct,
  findProductByEmail,
  createProduct,
  updateProduct,
  deleteProduct,
};
