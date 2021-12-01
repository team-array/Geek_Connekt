const user = require('../models/user');
const jwt = require('jsonwebtoken');

const verifyuser = (token) => {
    console.log(token);
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
            console.log(decoded);
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports = {verifyuser};