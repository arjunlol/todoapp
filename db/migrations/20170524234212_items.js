exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function (t) {
    t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.string('name').notNull();
        t.float('latitude').nullable();
        t.float('longitude').nullable();
        t.integer('categories_id').unsigned()
        t.foreign('categories_id').references('categories.id');
        t.integer('users_id').unsigned()
        t.foreign('users_id').references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};

