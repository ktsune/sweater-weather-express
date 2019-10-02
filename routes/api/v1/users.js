var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt')
var saltRounds = 10;
var uuid = require('uuidv4').default;
var User = require('../../../models').User
var pry = require('pryjs')

/* POST account creation */
router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  if (req.body.password == req.body.passwordConfirmation) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

    User.create({
        email: req.body.email,
        passwordDigest: hash,
        apiKey: uuid()
      })
      .then(user => {
        res.status(201).send(JSON.stringify({
          apiKey: user.apiKey
          })
        );
      })
      .catch(error => {
        res.status(422).send({ error: "Please choose a new email" });
      });
  })} else {
    res.status(401).send({ error: "Passwords do not match" });
  };
});

module.exports = router;
