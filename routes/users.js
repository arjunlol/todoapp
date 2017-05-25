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

  // //test route for testing API
  // router.get("/wolfsearch/:search", (req, res) => {

  // });

    //route handler for user creating an item
  router.post("/create", (req, res) => {
    //put item into the database
    //respond with both the category and the item
    let item = req.body.item;
    request({
      uri: 'http://api.wolframalpha.com/v2/query',
      qs: {
        input: item,
        appid: '8A2RH8-QPYYEQGL7K',
        output: 'json'
      }
    }).then((data) => {
      let wolframResult = JSON.parse(data);
      let category = wolframResult.queryresult.assumptions.values[0]["name"]
      res.send({category:item})
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

