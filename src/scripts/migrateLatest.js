const Knex = require('../knex/knex');

Knex.migrate
    .latest()
    .then((response) => {
        console.info('Success', response);
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error', error);
        process.exit(1);
    });
