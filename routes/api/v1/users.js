var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt')
var saltRounds = 10;
var uuid = require('uuidv4').default;
var User = require('../../../models').User

/* POST account creation */
router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");

    if (req.body.password == req.body.passwordConfirmation && req.body.email) {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

      User.create({
              email: req.body.email,
              password: hash,
              apiKey: uuid()
        })
        .then(user => {
          res.status(201).send(JSON.stringify({
            apiKey: user.apiKey
            })
          );
        })
        .catch(error => {
          res.status(500).send({ error: 'please re-enter your info' });
        });
      })
    } else {
      res.status(500).send({ error: "password and password confirmation do not match" });
    }
});

module.exports = router;
