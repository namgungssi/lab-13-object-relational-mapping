'use strict';



const mongoose = require('mongoose');
const Dog = require('../models/dog');
const request = require('superagent');
const expect = require('expect');
const server = require('../lib/server');
process.env.DB_URL = 'mongodb://localhost:27017/dog_test';
server.listen(5000);



beforeAll(() => {
  return Dog.remove({});
});



describe('POST functionality', () => {
  test('it should create dog', () => {
    return request
    .post('localhost:5000/api/v1/dogs')
    .send({name: 'test'})
    .then((res) => {
      expect(res.body.name).toBe('test');
      expect(res.body.favoriteFood).toBe('steak');
      expect(res.body.birthday).not.toBe(undefind);
      expect(res.status).toBe(200);
    });
  });


  test('it should create dog user food', () => {
    return request
    .post('localhost:5000/api/v1/dogs')
    .send({name: 'cat', favoriteFood: 'carrots'})
    .then((res) => {
      expect(res.body.name).toBe('cat');
      expect(res.body.favoriteFood).toBe('carrots');
      expect(res.status).toBe(200);
    });
  });
});



describe('GET functionality', () => {
  test('it should ')
})
