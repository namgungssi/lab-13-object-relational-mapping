'use strict';
const mongoose = require('mongoose');
const Cat = require('../models/cat');
const request = require('superagent');
const expect = require('expect');
process.env.DB_URL = 'mongodb://localhost:27017/cat_test';
const server = require('../lib/server');
server.listen(5000);

beforeAll(() => {
  return Cat.remove({});
});
describe('POST functionality', () =>{
  test('it should create a cat', () => {
    return request
    .post('localhost:5000/api/v1/cats')
    .send({name: 'test'})
    .then((res) => {
      expect(res.body.name).toBe( 'test');
      expect(res.body.favoriteDrug).toBe('cat nip');
      expect(res.body.favoriteFood).toBe('meow mix');
      expect(res.body.birthday).not.toBe(undefined);
      expect(res.status).toBe(200);
    });
  });

  test('it should create a cat with users fav food and fav drug', () => {
    return request
    .post('localhost:5000/api/v1/cats')
    .send({name: 'Sam', favoriteDrug: 'Chrysanthemum', favoriteFood: 'cat litter'})
    .then((res) => {
      expect(res.body.name).toBe('Sam');
      expect(res.body.favoriteFood).toBe('cat litter');
      expect(res.body.favoriteDrug).toBe('Chrysanthemum');
      expect(res.status).toBe(200);
    });
  });
});

describe('GET functionality', () =>{
  test('it should grab an Array of Cats', () => {
    return request
    .get('localhost:5000/api/v1/cats')
    .then(res => {
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  test('it should grab a single cat', () => {
    (new Cat({name: 'Tobee'})).save()
    .then((cat) => {
      return request
      .get('localhost:5000/api/v1/cats/' + cat._id)
      .then(res => {
        expect(res.body.name).toBe('Tobee');
      });
    });
  });
});
describe('PATCH functionality', () =>{
  test('it should update with a patch', () => {
    return (new Cat({name: 'testingapatch'})).save()
    .then(cat => {
      return request
      .put('localhost:5000/api/v1/cats/' + cat._id)
      .send({name: 'patchnewname'})
      .then(res => {
        expect(res.text).toBe('success!');
      });
    });
  });
});

describe('PATCH functionality', () =>{
  test('it should be able to murder a cat', () => {
    return (new Cat({name: 'dontYouDieOnMe'})).save()
    .then(cat => {
      return request
      .delete('localhost:5000/api/v1/cats/' + cat._id)
      .then(res => {
        expect(res.text).toBe('Bye bye cat!');
      });
    });
  });
});
