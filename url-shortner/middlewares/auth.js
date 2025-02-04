import { getUser } from "../utils/auth.js";

export async function checkForAuthentication(req, res, next) {

    req.user = null;

    /**
     * Token Extraction Logic from Header
     * 
     * const authorizationHeaderValue = req.headers["authorization"];
     *
     * if (!authorizationHeaderValue || authorizationHeaderValue.startsWith('Bearer')) {
     *   return next();
     * }
     * const token = authorizationHeaderValue.split("Bearer ")[1];
     */

    const tokenCookie = req.cookies?.token;
    if (!tokenCookie) {
        return next();
    }
    
    const user = getUser(tokenCookie);

    req.user = user;
    return next();
}

export function restrictTo(roles) {
    return function(req, res, next) {
        if (!req.user) {
            res.redirect('/login');
        }

        if (!roles.includes(req.user.role)) {
            return res.end('Unauthorized');
        }

        return next();
    }
}