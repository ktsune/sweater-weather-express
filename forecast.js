class Weather {
  constructor(location, forecastData) {
    this.location = location,
    // this.daily = forecastData.daily,
    // this.hourly = forecastData.hourly,
    this.currently = forecastData.currently
  }
}

module.exports = Weather;
