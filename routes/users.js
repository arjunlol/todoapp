"use strict";

const express = require('express');
const router  = express.Router();
var request = require('request-promise');
var parser = require('xml2json');

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

  //test route for testing API
  router.get("/wolfsearch/:search", (req, res) => {
    request({
      uri: 'http://api.wolframalpha.com/v2/query',
      qs: {
        input: req.params.search,
        appid: '8A2RH8-QPYYEQGL7K',
        format: 'json'
      }
    }).then((data) => {
      res.json(parser.toJson(data));
    })
    // .pipe(parser.toJson(res));
  });

  //route handler for register user
  router.post("/create", (req, res) => {

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

