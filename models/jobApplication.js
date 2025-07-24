const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobApplicationSchema = new Schema({
  education: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  coverLetter: {
    type: String,
    maxlength: 1000
  },
  portfolioLink: String,
  resumeFileName: String,
  appliedDate: {
    type: Date,
    default: Date.now
  },
  
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job' }
}, {
  timestamps: true
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
