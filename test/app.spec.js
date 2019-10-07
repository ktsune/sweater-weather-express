var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var pry = require('pryjs');
var user = require('../models').User;
var Favorite = require('../models').Favorite;

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate --env test')
      shell.exec('npx sequelize db:seed:all --env test')
      shell.exec('npx sequelize db:seed:all --env test')
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
    test('should return a 201', () => {
      return (request(app)
      .post("/api/v1/users"))
      .send({
        email: "whatever@example.com",
        password: "password",
        passwordConfirmation: 'password'
      })
      console.log(response)
      .then(response => {
        expect.assertions(1);
        expect(response.statusCode).toBe(201)
      })
    });
  });

  describe('Test user can log in', () => {
    test('should return a 200', () => {

      console.log('BEFORE CREATION')

      return user.create({
        email: "whatever@example.com",
        password: "password",
        apiKey: '123'
      })
        console.log('AFTER CREATION')

        .then(user => {

          return (request(app).post("/api/v1/sessions").send(
            {
              "email": "whatever@example.com",
              "password": "password"
            }
          ))})
          .then(response => {
            expect.assertions(1);
            expect(response.statusCode).toBe(200)
          })
        })
     });

  describe('Test user can send in an api key and get back a forecast',  () => {
    test('should return a 200', async () => {

        await user.create({
           email: 'whatever@gmail.com',
           password: 'password',
           apiKey: '12345'
         })
         return request(app).get("/api/v1/forecast?location=Denver,CO")
           .send({
               "apiKey": '12345'
               })
         .then(response => {
          expect.assertions(1);
          expect(response.statusCode).toBe(200)
        })
      })
    });

  describe('Test user can send in an api key & location to add a location to their favorites',  () => {
    test('should return a 200', async () => {
      let location = 'Denver, CO'
      console.log('BEFORE CREATION')

      await user.create({
         email: 'whatever@gmail.com',
         password: 'password',
         apiKey: '12345'
       })

       .then(user => {
         return request(app).post("/api/v1/favorites")
         .send({
           "apiKey": '12345',
           "location": 'Denver, CO'
         })
       })
         .then(response => {
           expect.assertions(1);
           expect(response.statusCode).toBe(200)
         })
        })
      })

  describe('Test user can send in an api key & location to delete a location from their favorites',  () => {
    test('should return a 200', async () => {
      let location = 'Denver, CO'

      await user.create({
         email: 'whatever@gmail.com',
         password: 'password',
         apiKey: '12345'
       })
       .then(user => {
         return Favorite.create({
           UserId: user.id,
           location: location
         })
       })
       .then(favorite => {
         return request(app).delete("/api/v1/favorites")
         .send({
           "apiKey": '12345',
           "location": location
         })
       })
         .then(response => {
           expect.assertions(1);
           expect(response.statusCode).toBe(204)
         })
        })
      })

  describe('Test user can send in an api key & get a list of their favorite locations',  () => {
    test('should return a 200', async () => {
      let location = 'Denver, CO'

      await user.create({
         email: 'whatever@gmail.com',
         password: 'password',
         apiKey: '12345'
       })
       .then(user => {
         Favorite.findAll({
           where: { UserId: user.id }
         })
         .then(favorite => {
           return request(app).get("/api/v1/favorites")
           .send({
             "apiKey": '12345',
           })
          })
         })
         .then(response => {
           console.log('FAV RESPONSE', response.body)
           expect.assertions(1);
           expect(response.statusCode).toBe(200)
         })
        })
      })
    });

    // const myFunction = async() => {
    // const exercises = await Exercise.find({ workoutId })
    // return exercises
    // };
    //
    // (async () => {
    //     const value = await myFunction()
    // })()
