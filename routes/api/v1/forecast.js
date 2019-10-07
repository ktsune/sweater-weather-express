var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();
var geocode = require('../../../services/darksky.service.js').GeocodeService
var darkSky = require('../../../services/geocode.service.js').DarkSkyService
var user = require('../../../models').User

/* GET weather forecast for a user */
router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  // weather = {}

  if (!req.body.apiKey) {
    return res.status(401).send({ error: "Invalid API Key" });
  }

  user.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE}`)

    .then(response => response.json())
    .then(latLongCoords => {

      let lat = latLongCoords.results[0].geometry.location.lat
      let long = latLongCoords.results[0].geometry.location.lng

      fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY}/${lat},${long}`)

        .then(darkSky => darkSky.json())
        .then(response => {

          res.status(200).send(JSON.stringify({
            daily: response.daily,
            currently: response.currently,
            hourly: response.hourly,
            location: response.location
           })
          )
        })
      })
    })
  })

module.exports = router;
