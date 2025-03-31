import express from 'express';
import AuthenticationController from '../../controllers/auth/AuthenticationController.js';

const router = express.Router();
const authController = new AuthenticationController();

router.post('/google', authController.getGoogleRefreshToken.bind(authController));
router.post('/refresh', authController.refreshGoogleAccessToken.bind(authController))

export default router;