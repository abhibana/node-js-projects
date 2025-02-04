import fs from 'fs';

export function logRequestResponse(fileName) {
    return (req, res, next) => {
        fs.appendFile(
            fileName, 
            `\n${Date.now()} ${req.ip} ${req.method} ${req.path}`,
            (err, data) => {
                next();
            }
        )
    }
}