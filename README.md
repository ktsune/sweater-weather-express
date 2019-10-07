# Sweater Weather Express

Sweater Weather Express re-writes the Sweater Weather project originally done in Ruby & Rails to a Node project using Express. You can find the repo for the original Ruby project here: https://github.com/ktsune/sweater-weather

#### You can also view the project board here:
https://github.com/ktsune/sweater-weather-express/projects/1

## Visit my app on Heroku
https://limitless-lowlands-17860.herokuapp.com/

## Initial Setup
1) Clone the repo:
- $ git clone git@github.com:ktsune/express_sweater_weather.git

2) Install npm:
- $ npm install

3) Update your config/config.json file:
- Change the username fields for test, development, and production environments to your own postgres username

4) Set up the database:
- $ npx sequelize db:create (need to change username in config.json?)
- $ npx sequelize db:migrate
- $ npx sequelize db:seed:all

5) Add a .env file to your root directory to save your API keys in

- **Note, you will need your own Google Geocoding & Dark Sky API keys for the external API's in this project**

6) Here is the format they should be in in your .env file:

```
GOOGLE_GEOCODING_API_KEY=<YOUR GOOGLE MAPS API KEY>
DARK_SKY_API_KEY=<YOUR DARK SKY API KEY>
```

## How to use

  1) Once you have them stored in a .env file (step 5 above), you can access your API keys using this format:

    process.env.GOOGLE_GEOCODING_API_KEY
    process.env.DARK_SKY_API_KEY

## Endpoints

### User Account Registration

Request:

```
POST /api/v1/users
Content-Type: application/json
Accept: application/json
body:
{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```

Response:

```
status: 201
body:
{
  "api_key": "6kzqk71x8vezd6odo5rp",
}

```

### User Log In

Request:

```
POST /api/v1/sessions
Content-Type: application/json
Accept: application/json
body:
{
  "email": "my_email@example.com",
  "password": "password"
}
```

Response:

```
status: 200
body:
{
  "api_key": "6kzqk71x8vezd6odo5rp",
}
```

### User Retrieves Weather Forecast for a City

Request:

```
GET /api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json
body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}

```

Response:

```
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

### User Can Add a Favorite Location to their Favorite's List

Request:

```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}

```

Response:

```
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}

```
### User Can List Out Their Favorite Locations

Requirements:

- API key must be sent
- If no API key or an incorrect key is provided return 401 (Unauthorized)

Request:

```
GET /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}

```

Response:

```
status: 200
body:
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]

```
### User Can Remove a Favorite Location from their Favorite's List

Request:

```
DELETE /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}

```

Response:

```
status: 204

```


## Known Issues

The forecast endpoint to retrieve a weather forecast returns additional weather objects beyond the 8 hourly weather objects & 7 daily weather objects as specified in the spec

## Start the Server

```javascript
$ npm start
```

## Running Tests

```javascript
$ npm test
```

## How to Contribute

If you'd like to contribute to this project, feel free to make a pull request at:

https://github.com/ktsune/sweater-weather-express/pulls

and click on `New Pull Request`

## Contributors
- Sarah Tatro

## Schema Design

<a href="https://cl.ly/cc761a767581" target="_blank"><img src="https://dzwonsemrish7.cloudfront.net/items/0B313i0k0M1u3E3h293Y/Screen%20Shot%202019-10-06%20at%2010.44.32%20PM.png" style="display: block;height: auto;width: 100%;"/></a>

## Tech Stack List

 - Node
 - Express
 - Shelljs
 - Bcrypt
 - Uuidv4
 - Node-fetch
