const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  date: { type: Date, default: () => new Date() },
  status: {
    type: String,
    enum: ['created', 'payed', 'cancelled', 'delivered'],
    default: 'created',
  },
  products: [
    {
      name: String,
      description: String,
      img: String,
      price: Number,
    },
  ],
});

// export default mongoose.model('Order', OrderSchema);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
