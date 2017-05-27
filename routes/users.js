"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const yelpSearch  = require('./yelp.js');
const productCheck = require('./product_check.js');
const wolframApi   = require('./WolframAPI.js');

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
    //let item = req.body.item
    let item = req.body.data;
    console.log('received req', req.body.item)
    //const item = 'pizza';

    yelpSearch(item, function(results){
      if(results){
        let category = "restaurant";
        res.send({category, item})
      }
      console.log(results.businesses[0].categories);

      // product_check(item) {
      //   console.log("ProductCheck is running", item)
      // }


    })

    // let created_at = new Date()
    // let item_id;
    // knex('categories').select('id').where('name', category) // Selects the id from the category that matches the name of the category
  })



  //route handler for register user
  router.post("/register", (req, res) => {
    //have to still check if user exists,
    //create the user knex
    let user = {
      user_name: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10), //encrypt password
      createdAt: new Date()
    }
    //insert user into the users table
    knex('users').insert(user)
      .then((resp) => {
        req.session.user = [user['email'], user['user_name']]; //set cookie upon succesful registering
        res.redirect('/');
      })
  });


  //route handler for returning list of specific catergory
  //assumes parameter is number corresponding to category... so that easy request to loop through
  router.get("/:category", (req, res) => {
    let email = req.session.user[0];
    let categories_id= req.params.category;
    let user_id;
    knex('users') //first find the id of the email
    .select('id')
    .where('email', email)
      .then((user_id) => {
        user_id = user_id[0].id
        knex('items') //then find the items with that category id and user id
        .select('name')
        .where('users_id', user_id)
        .andWhere('categories_id', categories_id)
        .then((items) => {
          res.json(items);
        })
      })
  });

  //updating the profile
  //will update to put method override when refactoring, post for mvp
  router.post("/profile", (req, res) => {
    //currently assuming that user wants to update all fields..
    //will refactor to only update what user wants later.
    let email = req.session.user[0];
    let nameNew = req.body.name;
    let emailNew = req.body.email;
    let passwordNew = bcrypt.hashSync(req.body.password, 10);

    knex('users')
    .where('email', email)
    .update({
      "user_name": nameNew,
      "email": emailNew,
      "password": passwordNew
    })
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      res.status(404).send(err);
    })
  });

  //update item from list
  router.put("/:category/:item", (req, res) => {
    let item = req.params.item;
    let category = req.params.category;
    let itemNew = req.body.item;
    let email = req.session.user[0];

    knex('categories').select('id').where('name', category) //first find the id of the category
      .then((id) => {
        let categories_id = id[0].id // Selects just the number from the array
        knex('users')
        .select('id')
        .where('email', email)
          .then((user_id) => { //then find the id of the user
            let user = user_id[0].id
            console.log(user)
            knex('items') //then find the item with that category id and user id
            .where('name', item)
            .andWhere('users_id', user)
            .andWhere('categories_id', categories_id)
            .update({
              "name": itemNew
            })
            .then((result) => {
              res.redirect('/');
            })
      })
      .catch(() => {
        res.status(403).send('Could not update');
      })
    });
  });

  //delete item from list
  //should method override to delete when refactoring
  router.delete("/:category/:item", (req, res) => {
    //currently does not check if user has permissions to delete that item
    let item = req.params.item;
    let category = req.params.category;
   let email = req.session.user[0];
    let item_id;
    let user_id;

    knex('categories').select('id').where('name', category) //first find the id of the category
      .then((id) => {
        console.log(id)
        let categories_id = id[0].id // Selects just the number from the array
        knex('users')
        .select('id')
        .where('email', email)
          .then((user_id) => { //then find the id of the user
            user_id = user_id[0].id
            knex('items') //then find the item with that category id and user id
            .where('name', item)
            .andWhere('users_id', user_id)
            .andWhere('categories_id', categories_id)
            .del() //delete the item
            .then(() => {
              res.redirect('/');
            })
          })
      })
      .catch(() => {
        res.status(403).send('Could not delete item');
      })
  });

  //log out user cookie session
  router.get("/logout", (req, res) => {
    req.session = null; //destroy cookie
    res.redirect('/');
  });

  router.post("/login", (req, res) => {
    if(req.body.email === "" ||  req.body.password === "" ){ //if user or pass left empty return error
      res.status(400).send("Please fill in both email and password");
      return;
    }
    let user = {
      "email": req.body.email,
      "password": req.body.password
    };
    //select all from the users table that match email address
    knex('users')
      .select()
      .where('email', user.email)
      .then((result) => {
          if(!result[0]){ //If email address does not exist in database
            console.log('1')
            res.status(403).send("Please input valid email/password");
            return;
          } else if(!(bcrypt.compareSync(user.password, result[0].password))) { //if incorrect password
            console.log('2')
            res.status(403).send("Please input valid email/password");
            return;
          } else { //correct email & password
            req.session.user = [user.email, result[0].user_name]; //set cookie if the correct email/pass
            res.redirect('/');
          }
        })
      .catch((err) =>{
        console.log(err);
      })
  });

  return router;
}

