const express = require('express');
const router=express.Router();
const postController=require('../controllers/post_controller');
const customMiddleware=require('../config/middleware');

router.get('/look/:id',customMiddleware.isAuthenticated,postController.post);
router.get('/create',customMiddleware.isAuthenticated,postController.createPost);
router.post('/create',customMiddleware.isAuthenticated,postController.addPost)


module.exports=router;