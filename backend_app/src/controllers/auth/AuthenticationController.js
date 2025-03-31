import AuthenticationService from "../../services/AuthenticationService.js";

export default class AuthenticationController {
	async getGoogleRefreshToken(req, res) {
		const authService = new AuthenticationService();

		return await authService.getGoogleRefreshToken(req, res);
	}

	async refreshGoogleAccessToken(req, res) {
		const authService = new AuthenticationService();

		return await authService.refreshGoogleAccessToken(req, res);
	}

	async getUserProfile(req, res) {
		const authService = new AuthenticationService();

		return await authService.fetchUserProfile(req, res);
	}
}