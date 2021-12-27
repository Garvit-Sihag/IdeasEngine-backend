const express=require('express');
const router = express.Router();
const jobController=require('../controllers/jobs_controller');

router.post('/create',jobController.createJob);

module.exports=router