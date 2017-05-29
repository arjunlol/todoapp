exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function (t) {
    t.increments("id").unsigned().primary();
        t.dateTime("createdAt").notNull();
        t.dateTime("updatedAt").nullable();
        t.string("user_name").notNull();
        t.string("email").notNull();
        t.string("password").notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};

