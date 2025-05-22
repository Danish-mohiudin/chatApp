import express from 'express'
import { isAuthenticated } from '../middlewares/authMiddleware.js'
import { sendMessage } from '../controllers/messageController.js';


const router = express.Router();
router.post('/send',isAuthenticated, sendMessage);  


export default router;