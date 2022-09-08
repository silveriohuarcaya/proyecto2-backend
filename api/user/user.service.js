const User = require('./user.model');

function getAllUser() {
  return User.find({});
}

function getByIdUser(id) {
  return User.findById(id);
}
function findUserByEmail(email) {
  return User.findOne({ email: email });
}
function createUser(user) {
  return User.create(user);
}
function updateUser(id, user) {
  return User.findByIdAndUpdate(id, user, { new: true });
}
function deleteUser(id) {
  return User.findByIdAndRemove(id);
}
module.exports = {
  getAllUser,
  getByIdUser,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};