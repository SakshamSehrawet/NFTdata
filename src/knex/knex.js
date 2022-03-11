const _ = require("lodash");
const db = require('../config/dbConfig')

// db.connection.typeCast = (field, next) => {
//   if (field.type === "DATE") {
//     return field.string();
//   }
//   return next();
// };

module.exports = require("knex")(db);
