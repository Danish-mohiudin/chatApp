import express from 'express'
import { login, register } from '../controllers/userController.js';


const router = express.Router();
router.post('/register', register)  // here simply we are difining the route method (get,post etc)
router.get('/login', login)

export default router;