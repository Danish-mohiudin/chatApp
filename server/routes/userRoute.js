import express from 'express'
import { getOtherUsers, getProfile, login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js'


const router = express.Router();

router.post('/register', register);  // here simply we are difining the route method (get,post etc),  when a client sends a POST request to /register, Express will call the register function.
router.post('/login', login);
router.post('/logout', isAuthenticated, logout); // It first calls the isAuthenticated middleware.If isAuthenticated, calls next(), then it proceeds to call the logout handler.
router.get('/get-profile', isAuthenticated, getProfile);
router.get('/get-other-users', isAuthenticated, getOtherUsers);

export default router;