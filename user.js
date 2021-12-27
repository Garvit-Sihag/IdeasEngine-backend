const express=require('express');
const router = express.Router();
const userController=require('../controllers/users_controller')
const customMiddleware=require('../config/middleware');



router.get('/log-in/:type',userController.LogIn)
router.get('/sign-up/:type',userController.SignUp)
router.post('/register/:type',userController.register)
router.post('/create-session',userController.createSession);
router.get('/log-out',customMiddleware.isAuthenticated,userController.destroySession);

module.exports=router