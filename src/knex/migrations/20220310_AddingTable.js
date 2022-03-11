exports.up = (knex) => {
    return knex.schema.createTable('StoreTransaction', (table) => {
        table.increments('id').primary();
        table.string('blockNumber').notNullable();
        table.string('txHash').notNullable();
        table.string('tokenAddress').notNullable();
        table.string('standard').notNullable();
        table.string('type').notNullable();
        table.string('operator').notNullable();
        table.string('tokenId').notNullable();
        table.string('from').notNullable();
        table.string('to').notNullable();
        table.string('value').notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('StoreTransaction');
};
