const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById } = require('../controller/jobController');
const upload = require('../middleware/upload');

router.post('/create', upload.single('logo'), createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);

module.exports = router;
