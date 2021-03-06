DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  categories_id SERIAL FOREIGN KEY,
  users_id SERIAL FOREIGN KEY,
  name VARCHAR(200) NOT NULL,
  date_added DATE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
);
