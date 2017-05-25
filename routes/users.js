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

    const listItem = {
      content: {
        text: req.body.text
      },
      created_at: Date.now()

      req.body.item
      req.body.category

    };
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

