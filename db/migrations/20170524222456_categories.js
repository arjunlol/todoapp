exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function (t) {
    t.increments('id').unsigned().primary();
        t.string('name').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
