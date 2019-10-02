var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var session = require('express-session');
var User = require('../../../models').User

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {

    if (user && req.body.email) {
      // debugger;

      bcrypt.compare(req.body.passwordDigest, user.password, function (err, result) {

        if (result == true) {
          res.status(200).send(JSON.stringify({
            apiKey: user.apiKey
          }));
        } else {
          res.status(401).send({ error: "Please re-enter your username & password" });
        }

      })

    } else {
      res.status(401).send({ error: "Email invalid" });
    }

  });
});

/* POST user log in */
// router.post("/", function(req, res, next) {
//  res.setHeader("Content-Type", "application/json");
 // bcrypt.hash(req.body.passwordDigest, saltRounds, function (err, hash) {

 // if (req.body.password == req.body.passwordConfirmation) {
   // User.findOne({
   //   where: {
   //     email: req.body.email
   //   }
   // }).then(user => {
   //       bcrypt.compare(req.body.password, user.password, function (err, result))
   //       if (result == true) {
   //         res.status(200).send(JSON.stringify({
   //           apiKey: user.apiKey
   //           }));
   //       } else {
   //         res.status(422).send({ error: "Please re-enter your username & password" });
   //     } else {
   //       res.status(422).send({ error: "Please re-enter your username & password" });
   //     }
   //    }
   //   })
   //   .catch(error => {
   //     res.status(422).send({ error: "Please re-enter your username & password" });
   //   });
   // });
 // } else {
   // res.status(401).send({ error: "Passwords do not match" });
 // }
// })


module.exports = router;
