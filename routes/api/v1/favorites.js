var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();
var user = require('../../../models').User
var favorite = require('../../../models').Favorite

router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let city = req.body.location

  if (!req.body.apiKey) {
    return res.status(401).send({ error: "Missing API Key" });
  }

  if (!req.body.location) {
    return res.status(401).send({ error: "Valid location required" });
  }

  user.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (!user) {
      return res.status(401).send({ error: "Missing API Key" });
    }
      return user.createFavorite({
        location: city
      })
      .then(favorite => {
        res.status(200).send({
           message: `${city} has been added to your favorites`
         })
      })
    .catch(error => {
      res.status(500).send({ error: 'favorite not created' });
    })
  });
})


module.exports = router;
