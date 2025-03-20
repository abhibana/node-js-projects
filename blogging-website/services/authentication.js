import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profileImageURL: user.profileImageURL,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SIGNING_KEY);

    return token;
}

export function validateToken(token) {
    const payload = jwt.verify(token, process.env.JWT_SIGNING_KEY);
    return payload;
}