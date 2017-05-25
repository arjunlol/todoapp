"use strict";

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');


module.exports = (knex) => {

  //user home page see their lists - logged in
  router.get("/", (req, res) => {

    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  // //test route for testing API
  // router.get("/wolfsearch/:search", (req, res) => {

  // });

    //route handler for user creating an item
  router.post("/create", (req, res) => {
    //put item into the database
    //respond with both the category and the item
  });
  //route handler for register user
  router.post("/register", (req, res) => {
    //have to still check if user exists,
    //create the user knex
    let user = {
      user_name: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      createdAt: new Date()
    }
    knex('users').insert(user)
      .then((resp) => {
        req.session.user = [user['user_name'], user['handler']];
        res.redirect('/')
      })
  });


  //route handler for returning list of specific catergory
  router.get("/:category", (req, res) => {

  });

  //updating the profile
  router.put("/profile", (req, res) => {

  });

  //update item from list
  router.put("/:category/:item", (req, res) => {

  });

  //delete item from list
  router.delete("/:category/:item", (req, res) => {

  });

  //log out user cookie session
  router.get("/logout", (req, res) => {

  });

  router.post("/profile", (req, res) => {

  });

  router.post("/login", (req, res) => {



  });

  return router;
}

