import express from 'express'
import { getProfile, login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js'


const router = express.Router();
router.post('/register', register);  // here simply we are difining the route method (get,post etc)
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.get('/get-profile', isAuthenticated, getProfile);

export default router;