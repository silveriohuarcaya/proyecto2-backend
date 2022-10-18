const Order = require('./preference.model');

function getAllPreference() {
  return Order.find({});
}

function createPreference(order) {
  return Order.create(order);
}
module.exports = {
  getAllPreference,
  createPreference,
};
