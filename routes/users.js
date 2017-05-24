"use strict";

const express = require('express');
const router  = express.Router();
var request = require('request');

module.exports = (knex) => {

  router.get("/", (req, res) => {

    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/wolfsearch/:search", (req, res) => {
    console.log('test');
    request({


      uri: 'http://api.wolframalpha.com/v2/query',
      qs: {
        input: req.params.search,
        appid: '8A2RH8-QPYYEQGL7K',
      }
    }).pipe(res);
  });
  return router;
}

