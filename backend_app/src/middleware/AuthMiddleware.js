
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ResponseUtils from '../utils/responses/ResponseUtils.js';

dotenv.config();

export default class AuthenticationMiddleware {
	constructor() {
		this.jwtSecret = process.env.JWT_SECRET;
	}

	generateJwt(user, res) {
		const responseUtils = new ResponseUtils();

		try{
			if (!this.jwtSecret) {
        		throw new Error("Missing JWT_SECRET in environment variables!");
    		}
    		return jwt.sign(user, this.jwtSecret, {expiresIn: "1h"});

		} catch(error) {
			return responseUtils.sendResponse(
		        res,
		        500,
		        'BAD REQUEST',
		        'MISSING JWT_SECRET',
		        error.message
		     );
		}	
	}

	async authenticateToken(req, res, next) {
		const authHeader = req.headers.authorization;
		const responseUtils = new ResponseUtils();

		if (!authHeader) {
	      return responseUtils.sendResponse(
	        res,
	        400,
	        'BAD REQUEST',
	        'INVALID HEADER',
	        'FAILURE'
	      );
		}
		const token = authHeader.split(' ')[1];

		if (!token) {
	      return responseUtils.sendResponse(
	        res,
	        400,
	        'BAD REQUEST',
	        'INVALID TOKEN',
	        'FAILURE'
	      );
		}

		try {
			const user = jwt.verify(token, this.jwtSecret);

			if (!user) {
		        return responseUtils.sendResponse(
		          res,
		          403,
		          'FORBIDDEN',
		          'UNAUTHORIZED ACCESS TO TOKEN',
		          'FAILURE'
		        );
			}

			req.user = user;
			next();
		} catch (error) {
	      return responseUtils.sendResponse(
	        res,
	        500,
	        'INTERNAL SERVER ERROR',
	        'FAILURE',
	        error.message
	      );
		}
	}
}