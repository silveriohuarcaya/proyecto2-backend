require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    console.log('Connected to MongoDB!!');
  } catch (error) {
    console.error('Error connecting to MongoDB');
    process.exit(1);
  }
}
module.exports = connectDB;
