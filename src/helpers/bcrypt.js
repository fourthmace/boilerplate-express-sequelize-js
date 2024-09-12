// LOAD LIBS
const bcrypt = require("bcrypt");

/**
 * Hash Text
 * 
 * @param {string} text - The text to be hashed.
 * @returns {string} - The hashed text.
 */
function hashText(text) {
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(text,salt);
    return hash;
}

/**
 * Compare Text
 * 
 * @param {string} text - The plain text.
 * @param {string} hashText - The hashed text.
 * @returns {boolean} - `true` if the text matches the hash, `false` otherwise.
 */
function compareText(text,hashText) {
    return bcrypt.compareSync(text,hashText)
}

module.exports = {
    hashText,
    compareText
}