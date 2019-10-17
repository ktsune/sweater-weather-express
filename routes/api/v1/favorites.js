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
      
      console.log('FAV RESPONSE', responseFav)

      responseFav.forEach(function(item) {
        let city = item.location
        userFav.push({"location": item.location})

        let response = fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY}/39.7392358,-104.990251"`)
        // let response = fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY}/${city.lat},${city.long}`)

        let results = response.json()
      // .then(responseForecast => {
      //   userFav.push({"currently": responseForecast.currently})

        let payload = [{
          weather: results.currently,
          location: userFav
        }]
        console.log('PAYLOAD', payload)
        return results

        .then(payload => res.status(200).send(payload))
       })
      })
      // })
    })

  .catch(error => {
    return res.status(500).send({ error: 'server error' });
    })
  });


/* DELETE removes a favorite from user's favorites list */

router.delete("/", function(req, res, next) {
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
      return Favorites.destroy({
        where: {
          location: city,
          UserId: user.id
        }
      })
      .then(favorite => {
        res.status(204).send()
      })
    .catch(error => {
      res.status(500).send({ error: error });
    })
  });
})

module.exports = router;
