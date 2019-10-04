var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();
var geocode = require('../../../services/darksky.service.js').GeocodeService
var darkSky = require('../../../services/geocode.service.js').DarkSkyService
var user = require('../../../models').User

/* Steps */

// Pull out the city and state from the
// GET request and send it to Google’s Geocoding API
// to retrieve the lat and long for the city

// Retrieve forecast data from the Darksky
// API using the lat and long

/* GET forecast for specific city */

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  // if (!req.body.apiKey) {
  //   res.status(400).send({ error: "Invalid API Key" });
  // } else {
  //   user.findOne({
  //     where: { apiKey: "12345" }
  //   })
  //
  //   console.log('USER', user)
  //   console.log('APIKEY', user.apiKey)
  //

      console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE}`)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE}`)
      .then(response =>
        response.json()
      )
      .then(result => console.log(result[0].geometry.location.lat))
      .catch(error => console.log(error))

    });

module.exports = router;
