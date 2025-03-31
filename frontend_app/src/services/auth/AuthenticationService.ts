export default class AuthenticationService {
	// register using google
	// login using google
	// get redirect to backend url

	backend_url: string;
	google_client_id: string;
	google_client_secret: string;
	google_redirect_uri: string;

	constructor() {
		this.backend_url = import.meta.env.VITE_BACKEND_URL;
		this.google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
		this.google_client_secret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
		this.google_redirect_uri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
	}

    async redirectToGoogle() {
    	const scope = "openid email profile";
    	const responseType = "code";

    	try {
    		const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.google_client_id}&redirect_uri=${encodeURIComponent(this.google_redirect_uri)}&response_type=${responseType}&scope=${scope}&prompt=consent&access_type=offline`;
		    window.location.href = googleAuthUrl;
    	} catch(error) {
    		console.error("Google OAuth Redirect Error:", error);
    	}
    }
}