const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Payment = new mongoose.Schema({
  customerId: String,
  cards: [
    {
      paymentMethodId: String,
      brand: String,
      country: String,
      expMonth: Number,
      expYear: Number,
      funding: String,
      last4: String,
    },
  ],
});

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: 'string',
      required: true,
      minlength: 6,
    },
    avatar: {
      type: 'string',
      default: 'https://example',
    },
    role: {
      type: 'string',
      enum: ['user', 'admin', 'company'],
      default: 'user',
    },
    isActive: {
      type: 'boolean',
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    payment: Payment,
  },
  { timestamps: true }
);

UserSchema.virtual('fullName').get(function fullName() {
  const { firstName, lastName } = this;
  return `${firstName} ${lastName}`;
});

UserSchema.virtual('profile').get(function profile() {
  const { firstName, lastName, email, password, role, company } = this;
  return {
    firstName,
    lastName,
    email,
    password,
    role,
    company,
  };
});

UserSchema.methods.comparePassword = function comparePassword(password) {
  const user = this;
  const isMatch = bcrypt.compare(password, user.password);
  return isMatch;
};

/* UserSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
}); */

const User = mongoose.model('User', UserSchema);

module.exports = User;
