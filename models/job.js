const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  logo: { type: String }, // For uploaded logo
  location: String,
  startDate: String,
  duration: String,
  stipend: String,
  applyBy: String,
  applicants: { type: Number, default: 0 },
  postedAgo: String,
  jobOffer: { type: Boolean, default: false },
  description: [String],
  skills: [String],
  whoCanApply: [String],
  requirements: [String],
  perks: [String],
  openings: { type: Number, default: 1 },
  companyInfo: String,
  activitySince: Number,
  activityOpportunities: Number,
  activityHired: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
