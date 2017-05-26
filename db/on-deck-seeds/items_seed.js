
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('items').insert({id: 7, createdAt: '2017-05-25 1:40', name: 'Pulp Fiction', categories_id: 3, users_id: 2}),
        knex('items').insert({id: 8, createdAt: '2017-05-25 1:40', name: 'The Catcher in the Rye', categories_id: 4, users_id: 1}),
        knex('items').insert({id: 9, createdAt: '2017-05-25 1:40', name: 'The Real Jerk', categories_id: 5, users_id: 1}),
        knex('items').insert({id: 10, createdAt: '2017-05-25 1:40', name: 'Trampoline', categories_id: 6, users_id: 2})
      ]);
    });
};
