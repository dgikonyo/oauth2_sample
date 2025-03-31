# OAuth2 Authentication with Google (Vue.js + Express.js)

## Overview
This project implements **OAuth2 authentication with Google** using a **Vue.js frontend** and an **Express.js backend**. The goal is to allow users to sign in with their Google accounts, verify their authentication on the backend, and receive a JWT token for secure API requests.

**Disclaimer:** This is a trial project intended for learning and experimentation. The project is provided "as-is" without any warranties, and the author assumes no responsibility for potential security vulnerabilities, data loss, or misuse resulting from the use of this implementation. Use at your own risk.

## Features
- **Google OAuth2 Login**: Users authenticate using Google from the Vue.js frontend.
- **Backend Token Validation**: The Express.js backend verifies the Google ID token.
- **JWT Token Generation**: The backend issues its own JWT for API requests.
- **Access Token Refresh**: The backend handles token refreshing using Google’s refresh tokens.

## Tech Stack
- **Frontend**: Vue.js 3 (Composition API), Vue Router, Axios
- **Backend**: Express.js, Google Auth Library, Axios, JWT, dotenv
- **Authentication**: OAuth2 with Google

## How It Works
1. **Frontend redirects to Google** for authentication.
2. **Google returns an authorization code**.
3. **Frontend sends the code to the backend**.
4. **Backend exchanges the code for Google tokens**.
5. **Backend verifies the ID token** and extracts user info.
6. **Backend issues a JWT token** to the frontend.
7. **Frontend stores the JWT** for future API requests.
8. **If the access token expires, the backend refreshes it**.

## Setup
### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/oauth2-google-auth.git
cd oauth2-google-auth
```

### 2. Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the **backend** folder:
```env
PORT=your_port
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:[your_port]/auth/google/callback
JWT_SECRET=your_jwt_secret
GOOGLE_TOKEN_URL=https://oauth2.googleapis.com/token
```

### 4. Run the Project
#### Start Backend
```sh
cd backend
npm start
```
#### Start Frontend
```sh
cd frontend
npm run dev
```

## API Endpoints
### **Authentication Routes**
#### 1. Google OAuth Redirect (Frontend)
- **URL**: `https://accounts.google.com/o/oauth2/auth`
- **Query Params**:
  - `client_id` = Your Google Client ID
  - `redirect_uri` = Your backend redirect URL
  - `response_type` = `code`
  - `scope` = `openid email profile`
  - `access_type` = `offline`
  - `prompt` = `consent`

#### 2. Exchange Authorization Code for Tokens (Backend)
- **POST** `/auth/google`
- **Request Body**:
  ```json
  {
    "code": "authorization_code_from_google"
  }
  ```
- **Response**:
  ```json
  {
    "jwt": "your_jwt_token",
    "access_token": "google_access_token"
  }
  ```

#### 3. Refresh Access Token (Backend)
- **POST** `/auth/refresh`
- **Request Body**:
  ```json
  {
    "userId": "google_user_id"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "new_google_access_token"
  }
  ```

## Notes
- If the `refresh_token` is missing, ensure `access_type=offline` and `prompt=consent` are included in the Google OAuth request.
- To reauthorize, revoke access at [Google Account Permissions](https://myaccount.google.com/permissions).

## Contributing
Feel free to fork, open issues, and submit PRs!

## License
MIT License

