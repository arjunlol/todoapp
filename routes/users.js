"use strict";

const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");
const yelpSearch  = require("./yelp.js");
const productCheck = require("./product_check.js")
const wolframApi   = require("./WolframAPI.js");
const movieInfo = require("./movieAPI");

module.exports = (knex) => {

  //route handler for user creating an item
  router.post("/create", (req, res) => { //user id hardcoded currently
  if(!req.session.user) {
    res.status(404).send("Not logged in")
    return;
  }
  let isProduct = undefined
  let isRestaurant = undefined
  let isBook = undefined
  let isMovie = undefined
  let item = req.body.item
  let created_at = new Date();
  let email = req.session.user[0]
  let alreadyAdded = false; //if the item is already added to db already



  //promise call all API"s to determine the category
  new Promise ((resolve, reject) => {
    yelpSearch(item, (result) => {
      console.log("yelpcity");
      if(result){
        isRestaurant = "restaurant";
      }
    });
    wolframApi(item, (result) => {
      console.log("wolfcity");
      if(result.movie){
        isMovie = "movie";
      }
      if(result.book){
        isBook = "book";
      }
      resolve()
    });
  }).then(() => { //after all api calls finsih the resond with category and store item in database
    let category = isMovie || isBook || isRestaurant || "product"; //prioritizes wolfram results

    knex("categories").select("id").where("name", category) // Selects the id from the category that matches the name of the category
    .then((id) => {
      let categories_id = id[0].id // Selects just the number from the array




      knex("users") //first find the id of the email
      .select("id")
      .where("email", email)
        .then((user_id) => {
          let user = user_id[0].id
          knex("items") //tfirst check if item is already in the database
          .select("id")
          .where("name", item)
          .andWhere("categories_id", categories_id)
          .andWhere("users_id", user)
          .then((items) => {
            console.log(items);
            if(items[0]){ //if the item was already added by the user
              res.status(403).send("Item was already added")
            } else {
              res.send(category);
              knex("items").insert({createdAt: created_at, name: item, categories_id: categories_id, users_id: user}) //Inserts a new row in the items table
              .then(() => {})
            }
          })
       })
    })
  }).catch((error) =>{
      console.log(error)
      return;
    })

  // Promise.all(promises)
  //   ,then(() => {
  //   })
    // productCheck(item, function(results) {
    //   console.log("Results of productCheck function:", results)
    //   if (results === true) {
    //     // let category = "product";
    //     isProduct = true
    //   }
    //   console.log("Product check sez isProduct =", isProduct)
    // });
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

    knex("users")
    .select("email")
    .where("email", user["email"])
    .then((emails) => {
      //if email already exists
      if(emails[0]){
        console.log("error");
        res.status(403).send("Email already exists");
      } else {
      //else insert user into the users table
      knex("users").insert(user)
        .then((resp) => {
          req.session.user = [user["email"], user["user_name"]]; //set cookie upon succesful registering
          res.send("");
        })
      }
    })

  });

  //route to get all items of a specified category
  router.get("/:category", (req, res) => {
    if(!req.session.user) {
      res.status(404).send("Please login")
      return;
    }
    let email = req.session.user[0];
    let category= req.params.category;
    let user_id;
    knex("categories").select("id").where("name", category) //first find the id of the category
      .then((id) => {
      let categories_id = id[0].id // Selects just the number from the array
      knex("users") //first find the id of the email
      .select("id")
      .where("email", email)
        .then((user_id) => {
          user_id = user_id[0].id
          knex("items") //then find the items with that category id and user id
          .select("name")
          .where("users_id", user_id)
          .andWhere("categories_id", categories_id)
          .then((items) => {
            res.json(items);
          })
        })
      })
      .catch((err) => {
        res.status(404).send(err);
      })
  });

  //updating the profile
  router.put("/profile", (req, res) => {
    let email = req.session.user[0];
    let nameNew = req.body.name || req.session.user[1]; //if no name provided use the old name
    let emailNew = req.body.email || req.session.user[0]; //is no email provided, use the old email address
    console.log(emailNew)
    let passwordNew = req.body.password || 0;
    knex("users")
    .select("password")
    .where("email", email)
    .then((result) => {
      let passwordOld = (result[0].password);
      knex("users")
      .where("email", email)
      .update({
        "user_name": nameNew,
        "email": emailNew,
        "password": passwordNew == 0 ? passwordOld: bcrypt.hashSync(req.body.password, 10)
      })
      .then((result) => {
        req.session.user = [emailNew, nameNew];
        res.send("Information provided has been updated");
      })
      .catch((err) => {
        res.status(404).send(err);
      })
    })
  });

  //update item from list to change the category
  router.put("/:category/:item", (req, res) => {
    if(!req.session.user) {
      res.status(404).send("Not logged in")
      return;
    }
    let item = req.params.item;
    let category = req.params.category;
    let categoryNew = req.body.category;
    let itemNew = req.body.item !== "" ? req.body.item: item; //if new item field empty only update the category
    let email = req.session.user[0];
    console.log("category", category, "newcat", categoryNew, "new item", itemNew)
    knex("categories").select("id").where("name", categoryNew) //first find the id of the category
      .then((id) => {
        let categories_id = id[0].id // Selects just the number from the array
        knex("users")
        .select("id")
        .where("email", email)
          .then((user_id) => { //then find the id of the user
            let user = user_id[0].id
            console.log(user)
            knex("items") //then find the item with that category id and user id
            .where("name", item)
            .andWhere("users_id", user)
            // .andWhere("categories_id", categories_id)
            .update({
              "name": itemNew,
              "categories_id": categories_id
            })
            .then((result) => {
              res.send("Updated");
            })
      })
      .catch(() => {
        res.status(403).send("Could not update");
      })
    });
  });

  //delete item from list
  //should method override to delete when refactoring
  router.delete("/:category/:item", (req, res) => {
    //currently does not check if user has permissions to delete that item
    if(!req.session.user) {
      res.status(404).send("Not logged in")
      return;
    }

    let item = req.params.item;
    let category = req.params.category;
    let email = req.session.user[0];
    let item_id;
    let user_id;

    knex("categories").select("id").where("name", category) //first find the id of the category
      .then((id) => {
        console.log(id)
        let categories_id = id[0].id // Selects just the number from the array
        knex("users")
        .select("id")
        .where("email", email)
          .then((user_id) => { //then find the id of the user
            user_id = user_id[0].id
            console.log(categories_id, user_id)
            knex("items") //then find the item with that category id and user id
            .where("name", item)
            .andWhere("users_id", user_id)
            .andWhere("categories_id", categories_id)
            .del() //delete the item
            .then(() => {
              res.send("Deleted");
            })
          })
      })
      .catch(() => {
        res.status(403).send("Could not delete item");
      })
  });

  //log out user cookie session
  router.post("/logout", (req, res) => {
    req.session = null; //destroy cookie
    res.send("Logged out");
  });

  router.post("/login", (req, res) => {
    if(req.body.email === "" ||  req.body.password === "" ){ //if user or pass left empty return error
      res.send("Invalid email address/password");
      return;
    }
    let user = {
      "email": req.body.email,
      "password": req.body.password
    };
    //select all from the users table that match email address
    knex("users")
      .select()
      .where("email", user.email)
      .then((result) => {
          if(!result[0]){ //If email address does not exist in database
            res.status(403).send("Invalid email/password");
            return;
          } else if(!(bcrypt.compareSync(user.password, result[0].password))) { //if incorrect password
            res.status(403).send("Invalid email/password");
            return;
          } else { //correct email & password
            req.session.user = [user.email, result[0].user_name]; //set cookie if the correct email/pass
            res.send("");
          }
        })
      .catch((err) =>{
        console.log(err);
      })
  });



  router.get("/movieInfo/:item", (req, res) => {
    if(!req.session.user) {
      res.status(404).send("Not logged in")
      return;
    }

    movieInfo(req.params.item, (info) => {
      res.json(info);
    })

  })

  return router;
}

