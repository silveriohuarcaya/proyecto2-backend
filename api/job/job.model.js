const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  salary: { type: 'string', required: true },
  type: {
    type: 'string',
    enum: ['hourly', 'monthly', 'yearly'],
    required: false,
  },
});

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imageLogo: {
      type: String,
      required: true,
    },
    responsabilities: [
      {
        type: String,
        required: true,
      },
    ],
    minimumQualifications: [
      {
        type: String,
        required: true,
      },
    ],
    preferredQualifications: [
      {
        type: String,
        required: true,
      },
    ],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: SalarySchema,
    candidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
