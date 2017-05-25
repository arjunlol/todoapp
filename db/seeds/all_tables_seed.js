let categories = [
  {id: 3, name: 'movie_tv'},
  {id: 4, name: 'book'},
  {id: 5, name: 'restaurant'},
  {id: 6, name: 'product'}
]

let users = [
  {id: 1, user_name: 'JaneDoe', email: 'Jane.Doe@fake.com', password: 'password1234', createdAt: '2017-05-04 9:40'},
  {id: 2, user_name: 'JohnDoe', email: 'John.Doe@fake.com', password: 'password1234', createdAt: '2017-05-04 9:40'}
]

let items = [
  {id: 7, createdAt: '2017-05-25 1:40', name: 'Pulp Fiction', categories_id: 3, users_id: 2},
  {id: 8, createdAt: '2017-05-25 1:40', name: 'The Catcher in the Rye', categories_id: 4, users_id: 1},
  {id: 9, createdAt: '2017-05-25 1:40', name: 'The Real Jerk', categories_id: 5, users_id: 1},
  {id: 10, createdAt: '2017-05-25 1:40', name: 'Trampoline', categories_id: 6, users_id: 2}
]

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('items').del(),
    knex('categories').del(),
    knex('users').del()
  ]).then( () => {
    // create categories
    return knex('categories').insert(categories);
  }).then( () => {
    // reset categories seq
    return knex.raw(`ALTER SEQUENCE categories_id_seq RESTART WITH ${categories.length + 1}`);

  }).then( () => {
    // create users
    return knex('users').insert(users);
  }).then( () => {
    // reset users seq
    return knex.raw(`ALTER SEQUENCE users_id_seq RESTART WITH ${users.length + 1}`);

  }).then( () => {
    // create items
    return knex('items').insert(items);
  }).then( () => {
    // reset items seq
    return knex.raw(`ALTER SEQUENCE items_id_seq RESTART WITH ${items.length + 1}`);
  });
};
