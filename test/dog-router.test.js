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


describe('POST functionality', () =>{
  test('it should create a dog', () => {
    return request
    .post('localhost:5000/api/v1/dogs')
    .send({name: 'test'})
    .then((res) => {
      expect(res.body.name).toBe( 'test');
      expect(res.body.favoriteFood).toBe('pedigree');
      expect(res.body.birthday).not.toBe(undefined);
      expect(res.status).toBe(200);
    });
  });


  test('it should create a dog with users fav food', () => {
    return request
    .post('localhost:5000/api/v1/dogs')
    .send({name: 'toby', favoriteFood: 'meat'})
    .then((res) => {
      expect(res.body.name).toBe('toby');
      expect(res.body.favoriteFood).toBe('pedigree');
      expect(res.status).toBe(200);
    });
  });
});



describe('GET functionality', () =>{
  test('it should get array of dogs', () => {
    return request
    .get('localhost:5000/api/v1/dogs')
    .then(res => {
      expect(Array.isArray(res.body)).toBe(true);
    });
  });


  test('it should get single dog', () => {
    (new Dog({name: 'choco'})).save()
    .then((dog) => {
      return request
      .get('localhost:5000/api/v1/dogs/' + dog._id)
      .then(res => {
        expect(res.body.name).toBe('choco');
      });
    });
  });
});



describe('PATCH functionality', () =>{
  test('it should update with a patch', () => {
    return (new Dog({name: 'testingapatch'})).save()
    .then(dog => {
      return request
      .put('localhost:5000/api/v1/dogs/' + dog._id)
      .send({name: 'patchnewname'})
      .then(res => {
        expect(res.text).toBe('success');
      });
    });
  });
});



describe('PATCH functionality', () =>{
  test('it should be able to remove dog', () => {
    return (new Dog({name: 'removing dog'})).save()
    .then(dog => {
      return request
      .delete('localhost:5000/api/v1/dogs/' + dog._id)
      .then(res => {
        expect(res.text).toBe('bye dog');
      });
    });
  });
});
