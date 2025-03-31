import express from 'express';
import AuthenticationController from '../../controllers/auth/AuthenticationController.js';

const router = express.Router();
const authController = new AuthenticationController();

router.get("/profile", authController.getUserProfile.bind(authController));

export default router;