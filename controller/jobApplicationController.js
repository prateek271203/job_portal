const JobApplication = require('../models/jobApplication');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

const submitApplication = async (req, res) => {
  try {
    const {
      education,
      availability,
      experience,
      coverLetter,
      portfolioLink
    } = req.body;

    let resumeFileName = null;
    if (req.file) {
      resumeFileName = Date.now() + '_' + req.file.originalname;

      const savePath = path.join(UPLOAD_DIR, resumeFileName);
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });

      fs.writeFileSync(savePath, req.file.buffer);
    }

    const application = new JobApplication({
      education,
      availability,
      experience,
      coverLetter,
      portfolioLink,
      resumeFileName
    });

    await application.save();
    res.status(200).json({ message: "Application submitted successfully" });

  } catch (error) {
    console.error("Application submission failed:", error);
    res.status(500).json({ message: "Failed to submit application" });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ appliedDate: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Fetching applications failed:", error);
    res.status(500).json({ message: "Failed to retrieve applications" });
  }
};

module.exports = {
  submitApplication,
  getAllApplications
};
