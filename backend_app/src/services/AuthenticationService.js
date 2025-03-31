import {OAuth2Client} from "google-auth-library";
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthenticationMiddleware from '../middleware/AuthMiddleware.js'

dotenv.config();

export default class AuthenticationService {
	// login using multiple service providers
	// compare if the email is registered
	constructor() {
		this.googleTokenUrl = process.env.GOOGLE_TOKEN_URL;
		this.googleClientId = process.env.GOOGLE_CLIENT_ID;
		this.refreshTokens = new Map();
	}

	async getGoogleRefreshToken(req, res) {
		const { code } = req.body;
		const client = new OAuth2Client(this.googleClientId);
		const authMiddleware = new AuthenticationMiddleware();

		try {
			const response = await axios.post(this.googleTokenUrl, {
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: process.env.GOOGLE_REDIRECT_URI,
				grant_type: "authorization_code",
				code,
			}, { headers: { "Content-Type": "application/x-www-form-urlencoded" }});

			const { id_token, access_token, refresh_token } = response.data;
			const ticket = await client.verifyIdToken({ idToken: id_token, audience: this.googleClientId});
			const payload = ticket.getPayload();

			if (payload.sub == null) {
				return res.status(409).json({
					error: payload,
				});
			}

			this.refreshTokens.set(payload.sub, refresh_token);
			const jwtToken = authMiddleware.generateJwt({userId: payload.sub, email: payload.email}, res);

			return res.json({
				jwt: jwtToken,
				access_token
			});
		} catch(error){
			return res.status(400).json({error: "Invalid authorization code"});
		}
	}

	async refreshGoogleAccessToken(req, res) {
		const { userId } = req.body;

		if (!this.refreshTokens.has(userId)) {
			return res.status(403).json({error: "Invalid refresh token"});
		}

		try{
			const response = await axios.post(this.googleTokenUrl,{
				client_id: process.env.GOOGLE_CLIENT_ID,
      			client_secret: process.env.GOOGLE_CLIENT_SECRET,
      			grant_type: "refresh_token",
      			refresh_token: this.refreshTokens.get(userId),
				});

			const newAccessToken = response.data.access_token;
    		res.json({ access_token: newAccessToken });
		} catch(error) {
			res.status(400).json({ error: "Failed to refresh token" });
		}
	}

	async fetchUserProfile(req, res) {
		res.json({ message: "Welcome to your profile!", user: req.user });
	}
}