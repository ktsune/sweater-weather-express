# Sweater Weather Express

Sweater Weather Express re-writes the Sweater Weather project originally done in Ruby & Rails to a Node project using Express

## Visit my app on Heroku
https://limitless-lowlands-17860.herokuapp.com/

## Initial Setup

## How to Use

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

## Known Issues

## Running Tests

```javascript
npm test
```

## How to Contribute

## Core Contributors
- Sarah Tatro

## Schema Design

## Tech Stack List

 - Node
 - Express
 - Shelljs
 - Bcrypt
 - Uuidv4 
