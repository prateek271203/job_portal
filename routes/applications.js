const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  submitApplication,
  getAllApplications
} = require('../controller/jobApplicationController');

router.post('/', upload.single('resume'), submitApplication);

router.get('/', getAllApplications);

module.exports = router;
