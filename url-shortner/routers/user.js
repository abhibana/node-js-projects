import express from 'express'
import { handleUserSignUp, handleUserLogin, handleUserLogout } from '../controllers/user.js';

export const router = express.Router();

router.post('/', handleUserSignUp);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);