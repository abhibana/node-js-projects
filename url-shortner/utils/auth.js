import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import e from 'express';

dotenv.config();

export function setUser( user) {
    const payload = {
        _id : user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, process.env.JWT_SIGNING_KEY);
}

export function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SIGNING_KEY);
    } catch {
        return null;
    }
}
