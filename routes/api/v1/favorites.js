var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();
var user = require('../../../models').User
var Favorites = require('../../../models').Favorite

/* POST add a favorite for a user */
router.post("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let city = req.body.location

  if (!req.body.apiKey) {
    return res.status(401).send({ error: "Missing API Key" });
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
      res.status(500).send({ error: error });
    })
  });
})


/* GET lists user's favorite locations */
router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let userFav = []

  if (!req.body.apiKey) {
    return res.status(401).send({ error: "Missing API Key" });
  }

  user.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (!user) {
      return res.status(401).send({ error: "Missing API Key" });
    }

    Favorites.findAll({
      where: { UserId: user.id }
    })

    .then(responseFav => {
      responseFav.forEach(function(item) {
        userFav.push({"location": item.location})
      })
      fetch(`localhost:3000/api/v1/forecast?location=Denver,CO`)
      .then(responseForecast => {
        userFav.push({"currently": responseForecast.currently})
      })

      payload = [{
        data: userFav
      }]
      return res.status(200).send(payload)
      })
    })

  .catch(error => {
    return res.status(500).send({ error: 'server error' });
    })
  });


/* DELETE removes a favorite from user's favorites list */


module.exports = router;
