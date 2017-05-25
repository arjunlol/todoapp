exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function (t) {
    t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.string('name').notNull();
        t.float('latitude').nullable();
        t.float('longitude').nullable();
        t.foreign('categories_id').references('categories.id').notNull();
        t.foreign('users_id').references('users.id').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};

