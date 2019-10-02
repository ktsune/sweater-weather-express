var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt')
var saltRounds = 10;
var uuid = require('uuidv4').default;
var User = require('../../../models').User

/* POST account creation */
router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  bcrypt.hash(req.body.passwordDigest, saltRounds, function (err, hash) {

  if (req.body.passwordDigest == req.body.passwordConfirmation) {
    User.create({
        email: req.body.email,
        password: hash,
        apiKey: uuid()
      })
      .then(user => {
        res.status(201).send(JSON.stringify({
          apiKey: user.apiKey,
          status: res.status
          })
        );
      })
      .catch(error => {
        res.status(422).send({ error: "Please choose a new email" });
      });
  } else {
    res.status(401).send({ error: "Passwords do not match" });
  }

  });
});

module.exports = router;
