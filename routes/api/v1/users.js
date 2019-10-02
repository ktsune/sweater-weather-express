var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt')
var saltRounds = 10;
var uuid = require('uuidv4').default;
var User = require('../../../models').User

/* POST account creation */
router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  bcrypt.hash(req.body.passwordDigest, saltRounds, function (err,   hash) {

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
      res.status(500).send({ error: "please choose a different email" });
    });
  });
});

module.exports = router;
