const knex = require("./knex");
/**
 * Description: Runs a raw mysql statement
 * @param query: Object, raw query
 * @param values: array, values of placeholders in query
 * @access privileged instance method
 * @return Promise {Object}, which resolves into a knex result object
 */
function raw(query, values) {
  return knex.raw(query, values).then((result) => {
    // Returns the rows, result[1] has all the field data
    return result[0];
  });
}

function create(row) {
  return knex('StoreTransaction')
    ["insert"](row)
    .then((result) => {
      return result;
    });
}
module.exports = {
    create,
    knexRaw: raw
};
