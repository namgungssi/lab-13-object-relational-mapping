'use strict';



const request = require('superagent');
const Dog = require('../models/dog');
const mongoose = require('mongoose');
const expect = require('expect');



process.env.DB_URL = 'mongodb://localhost:27017/dog_test';
process.env.PORT = 4000;



beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return Dog.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});


let dogID = '';


describe('POST', () =>{

  test('it should create a dog', () => {
    return request
      .post('localhost:4000/api/1.0/dog')
      .send({name: 'toby'})
      .then((res) => {
        dogID = res.body._id;
        expect(res.body.name).toBe( 'toby');
        expect(res.body.favoriteFood).toBe('steak');
        expect(res.body.birthday).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });


  test('it should create a new dog profile', () => {
    return request
      .post('localhost:4000/api/1.0/dog')
      .send({name: 'toby', favoriteFood: 'steak'})
      .then((res) => {
        expect(res.body.name).toBe('toby');
        expect(res.body.favoriteFood).toBe('steak');
        expect(res.status).toBe(200);
      });
  });


  test('it should return a 400 if json is bad', () => {
    return request
      .post('localhost:4000/api/1.0/dog')
      .send('Codefellows')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.message).toEqual('error request');
      });
  });
});



describe('GET', () =>{

  test('return all dogs if no id provided', () => {
    return request
      .get('localhost:4000/api/1.0/dog')
      .then(res => {
        expect(res.body[0].name).toBe('toby');
        expect(res.body[1].name).toBe('teddy');
        expect(res.status).toBe(200);
      });
  });


  test('it should get a single dog with id param', () => {
    return request
      .get(`localhost:4000/api/1.0/dog/${dogID}`)
      .then(res => {
        expect(res.body.name).toBe('toby');
        expect(res.status).toBe(200);
      });
  });


  test('it should return a 404 for invalid id', () => {
    let badID = 11111;
    return request
      .get(`localhost:4000/api/1.0/dog/${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('error missing');
      });
  });
});


describe('PUT', () => {

  test('it should update w put id', () => {
    return request
      .put(`localhost:4000/api/1.0/dog/${dogID}`)
      .send({name: 'Pebbles'})
      .then(res => {
        expect(res.text).toBe('update successful');
        expect(res.status).toEqual(200);
      });
  });


  test('it should return a 400 if no body', () => {
    return request
      .put(`localhost:4000/api/1.0/dog/${dogID}`)
      .send({})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.message).toEqual('error request');
      });
  });


  test ('it should return a 404 when no body is provided', () => {
    let badID = 11111;

    return request
      .put(`localhost:4000/api/1.0/dog/${badID}`)
      .send({name: 'john doe'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('missing');
      });
  });
});



describe('PATCH', () => {

  test('it should update using patch', () => {
    return request
      .patch(`localhost:4000/api/1.0/dog/${dogID}`)
      .send({name: 'john john'})
      .then(res => {
        expect(res.text).toBe('dog has been updated');
        expect(res.status).toEqual(200);
      });
  });
});



describe('DELETE', () => {

  test('it should delete dog', () => {
    return request
      .delete(`localhost:4000/api/1.0/costumes/${dogID}`)
      .then(res => {
        expect(res.text).toEqual('dog has been deleted');
      });
  });
});
