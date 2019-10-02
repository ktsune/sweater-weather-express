var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../../../models').User
var pry = require('pryjs')

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  if (!req.body.email) {
    res.status(400).send({ error: "Email invalid" });
  } else {
    User.findOne({
      where: {
        email: req.body.email
      }
    })

    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.passwordDigest)) {
          res.status(200).send(JSON.stringify({
            apiKey: user.apiKey
          }));
        } else {
          res.status(401).send({ error: "Please re-enter your username & password" });
        }

      } else {
        res.status(422).send({ error: "Please re-enter your username & password" });
      }
    })}
});
    // } else {
    //   res.status(401).send({ error: "Email invalid" });
    // }


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
