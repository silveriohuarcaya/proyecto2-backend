const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
});

// export default mongoose.model('Product', ProductSchema);
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
