import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import ResponseUtils from "./src/utils/responses/ResponseUtils.js";
import AuthenticationMiddleware from './src/middleware/AuthMiddleware.js'

// routes
import AuthRoutes from './src/routes/auth/AuthenticationRoutes.js';
import ProfileRoutes from './src/routes/profile/ProfileRoutes.js'

// declarations
dotenv.config();
const app = express();
const PORT = process.env.SERVER_URL || 3000;
const responseUtils = new ResponseUtils();
const authMiddleware = new AuthenticationMiddleware();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(responseUtils.logger);

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1', (req, res, next)=> authMiddleware.authenticateToken(req, res, next), ProfileRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});