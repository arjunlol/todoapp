
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({user_name: 'JaneDoe', email: 'Jane.Doe@fake.com', password: 'password1234', createdAt: '2017-05-04 9:40'}),
        knex('users').insert({user_name: 'JohnDoe', email: 'John.Doe@fake.com', password: 'password1234', createdAt: '2017-05-04 9:40'}),
      ]);
    });
};
