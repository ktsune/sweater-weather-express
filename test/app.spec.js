var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var pry = require('pryjs')

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate --env test')
      shell.exec('npx sequelize db:seed:all --env test')
      console.log(shell.exec('npx sequelize db:seed:all --env test'))
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
      return request(app).post("/api/v1/users").then(response => {
        expect(response.statusCode).toBe(201)
      })
    });
  });

  describe('Test user can log in', () => {
    test('should return a 200', () => {
      return request(app).post("/api/v1/sessions").then(response => {
        expect(response.statusCode).toBe(200)
      })
    });
  });
});
