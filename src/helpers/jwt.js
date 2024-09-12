// LOAD LIBS
require('dotenv').config();
const jwt = require("jsonwebtoken");

// LOAD CONFIG
const KEY = process.env.NODE_JWT_KEY || 'hahaha';;

/**
 * Generate JWT Token
 * 
 * @param {Object} payload - Data yang ingin dimasukkan ke dalam token.
 * @returns {string} - Token JWT yang telah dibuat.
 */
function generateToken(payload) {
    const token = jwt.sign(payload,KEY);
    return token
}

/**
 * Verify JWT Token
 * 
 * @param {string} token - Token JWT yang akan diverifikasi.
 * @returns {Object} - Data yang didekode dari token jika valid.
 * @throws {string} - Error dengan kode 401 jika token tidak valid.
 */
function verifyToken(token) {
    try {
        const decode = jwt.verify(token,KEY);
        return decode
    } catch (error) {
        throw new Error('unauthorized');
    }
}

module.exports = {
    generateToken,
    verifyToken
}