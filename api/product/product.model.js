const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
});

// export default mongoose.model('Product', ProductSchema);
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
