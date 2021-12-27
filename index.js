const express = require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');

router.get('/home',homeController.home);
router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/jobs',require('./jobs'));
router.use('/recruit',require('./recruit'));

module.exports  = router;