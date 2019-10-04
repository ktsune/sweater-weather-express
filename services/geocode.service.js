class GeocodeService {
  constructor(location) {
    this.location = location
  }

  fetchCoords() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json'), {
     params: { address: this.location, key: process.env.GOOGLE },
     headers: {"Content-Type": "application/json"},
     method: 'get'
   }
    .then(response => console.log(response.json()))
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }
}

module.exports = {
  GeocodeService: GeocodeService
}
