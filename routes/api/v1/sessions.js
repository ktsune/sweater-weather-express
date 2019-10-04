var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../../../models').User
var pry = require('pryjs')

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  console.log(req.body.email)
  console.log(req.body.password)

  if (!req.body.email || !req.body.password) {
    res.status(400).send({ error: "Email invalid" });
  } else {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).send(JSON.stringify({
            apiKey: user.apiKey
          }));
        } else {
          res.status(401).send({ error: "Please re-enter your username & password" });
        }
    })}
});



module.exports = router;
