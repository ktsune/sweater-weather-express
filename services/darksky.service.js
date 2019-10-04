class DarkSkyService {
  constructor(lat, long) {
    this.lat = lat
    this.long = long
  }

  fetchForecast() {
    fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY}/${this.lat},${this.long}`), {
     // params: { lat: this.lat, long: this.long, key: process.env.DARKSKY },
     headers: {"Content-Type": "application/json"},
     method: 'get'
   }
    .then(response => console.log(response.json()))
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }
}

module.exports = {
  DarkSkyService: DarkSkyService
}
