const Job = require('../models/job');

const createJob = async (req, res) => {
  try {
    if (!req.body || !req.body.title) {
      return res.status(400).json({ message: 'Job data is missing or invalid' });
    }

    const jobData = { ...req.body };

    // ✅ Include full URL for logo if file exists
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      jobData.logo = `${baseUrl}/uploads/logos/${req.file.filename}`;
    }

    const job = new Job(jobData);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error creating job:", error.message);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const jobs = await Job.find().sort({ createdAt: -1 });

    // ✅ Attach full logo URL for each job
    const jobsWithFullLogoUrl = jobs.map(job => {
      const jobObj = job.toObject();
      if (jobObj.logo && !jobObj.logo.startsWith('http')) {
        jobObj.logo = `${baseUrl}${jobObj.logo}`;
      }
      return jobObj;
    });

    res.status(200).json(jobsWithFullLogoUrl);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const jobObj = job.toObject();
    if (jobObj.logo && !jobObj.logo.startsWith('http')) {
      jobObj.logo = `${req.protocol}://${req.get('host')}${jobObj.logo}`;
    }

    res.status(200).json(jobObj);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch job' });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById
};
