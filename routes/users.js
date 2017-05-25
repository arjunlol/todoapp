"use strict";

const express = require('express');
const router  = express.Router();
var request = require('request-promise');

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

    //route handler for user creating an item
  router.post("/create", (req, res) => {
    let item = req.body.item
    let category = req.body.category
    let created_at = new Date()
    let item_id;

    knex('categories').select('id').where('name', category) // Selects the id from the category that matches the name of the category
      .then((id) => {

      item_id = id[0].id // Selects just the number from the array
      knex('items').insert({createdAt: created_at, name: item, categories_id: item_id, users_id: 2}) //Inserts a new row in the items table
        .then((result) => {})
      })
  });

  //route handler for register user
  router.post("/register", (req, res) => {

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

  return router;
}

