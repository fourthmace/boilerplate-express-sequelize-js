// LOAD LIBS
const { sequelize } = require("../models"); // Pastikan sequelize di-import dari models atau tempat yang sesuai

/**
 * Format JSON response
 *
 * @param {Object} res - The response object from Express.
 * @param {number} statusCode - HTTP status code.
 * @param {string} message - Response message.
 * @param {Object} [data] - Optional data to include in the response.
 */
const formatResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    message: message,
    data: data,
  });
};

/**
 * Generate next auto-increment value for a given table and composite primary key.
 *
 * @param {string} tableName - The name of the table.
 * @param {string[]} primaryKeyColumns - Array of primary key column names.
 * @returns {Promise<number>} - The next auto-increment value.
 */
async function generateAutoIncrement(tableName, primaryKeyColumns) {
  try {
    // Generate SQL query to get the max value of the primary key
    // const primaryKeyColumnsString = primaryKeyColumns.join(", ");
    const query = `
            SELECT MAX(${primaryKeyColumns[0]}) AS maxKey
            FROM ${tableName};
        `;

    // Execute the query
    const [result] = await sequelize.query(query);
    const maxKey = parseInt(result[0]?.maxKey) || 0;

    return maxKey + 1;
  } catch (error) {
    console.error("Error generating auto-increment value:", error);
    throw error;
  }
}

module.exports = {
  formatResponse,
  generateAutoIncrement,
};
