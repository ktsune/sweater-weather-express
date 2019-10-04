var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var pry = require('pryjs');
var user = require('../models').User;

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate --env test')
      shell.exec('npx sequelize db:seed:all --env test')
      // console.log(shell.exec('npx sequelize db:seed:all --env test'))
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
  });

  describe('Test the root path', () => {
    test('should return a 200', () => {
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200)
      })
    });
  });

  describe('Test user account creation', () => {
    test('should return a 201 & an api key', async () => {
      const response = await request(app).post("/api/v1/users").send({
        "email":"whatever@example.com",
        "password":"password",
        "passwordConfirmation":"password"
      })
      .then(response => {
        expect(response.statusCode).toBe(201)
      })
    });
  });

  describe('Test user can log in', () => {
    test('should return a 200 & an api key', () => {
      return user.create({
        "email":"whatever@example.com",
        "password":"password",
        "apiKey":"12345"
      })
      .then(user => {
        request(app).post("/api/v1/sessions").send({
          "email":"whatever@example.com",
          "password":"password"
        })
      })
      console.log(user)
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
    });
  });

  describe('Test user can send in an api key and get back a forecast', () => {
    test('should return a 200', () => {
      // console.log("In here")
      // return user.create({
      //   "email":"whatever@example.com",
      //   "password":"password",
      //   "apiKey":"12345"
      // })
      // .then(user => {
        console.log("AFTER USER CREATION")
        return request(app).get("/api/v1/forecast?location=Denver,CO&key=12345")
        // .send({ apiKey: apiKey })
        // })
        .then(response => {
          console.log("-----------------")
          // console.log(response)
          // console.log("-----------------")
          expect(response.statusCode).toBe(200)
        })
      });
    });
});
