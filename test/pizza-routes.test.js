'use strict';



const request = require('superagent');
const Pizza = require('../models/pizza');
const mongoose = require('mongoose');
const expect = require('expect');



process.env.DB_URL = 'mongodb://localhost:27017/pizza_stg';
process.env.PORT = 4000;
// server.listen(4000);

beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return Pizza.remove({});
});


afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});


let pizzaID = '';

describe('POST /api/1.0/pizza', () => {

  test('it should create a new pizza', () => {
    return request
      .post('localhost:4000/api/1.0/pizza')
      .send({name: 'cheese', profile: 'classic', parts: ['cheese', 'sauce', 'dough']})
      .then((res) => {
        pizzaID = res.body._id;
        expect(res.body.name).toBe('cheese');
        expect(res.body.profile).toBe('classic');
        expect(res.body.parts).not.toBe(undefined);
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });

  test('it should create another new pizza', () => {
    return request
      .post('localhost:4000/api/1.0/pizza')
      .send({
        'name': 'sausage',
        'parts': [
          'cheese',
          'sauce',
          'dough',
          'sausage',
        ],
        'profile': 'italian',
      })
      .then((res) => {
        expect(res.body.name).toBe('sausage');
        expect(res.body.profile).toBe('italian');
        expect(res.body.parts[0]).toBe('sausage');
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });

  test('it should return a 400 if bad json is given', () => {
    return request
      .post('localhost:4000/api/1.0/pizza')
      .send('hello world')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.message).toEqual('bad request');
      });
  });
});


describe('GET /api/1.0/pizza', () => {
  test('it should return all pizza if no id is given', () => {
    return request
      .get('localhost:4000/api/1.0/pizza')
      .then(res => {
        expect(res.body[0].name).toBe('cheese');
        expect(res.body[1].name).toBe('sausage');
        expect(res.status).toBe(200);
      });
  });


  test('it should get a single pizza with id param', () => {
    return request
      .get(`localhost:4000/api/1.0/pizza/${pizzaID}`)
      .then(res => {
        expect(res.body.name).toBe('cheese');
        expect(res.status).toBe(200);
      });
  });


  test('it should return a 404 for invalid id', () => {
    let badID = 1234;
    return request
      .get(`localhost:4000/api/1.0/pizza/${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('not found');
      });
  });
});


describe('PUT /api/1.0/pizza', () => {

  test('it should update with a put when valid ID is given', () => {
    return request
      .put(`localhost:4000/api/1.0/pizza/${pizzaID}`)
      .send({name: 'brian', profile: 'coder'})
      .then(res => {
        expect(res.text).toBe('pizza has been updated!');
        expect(res.status).toEqual(200);
      });
  });

  test('it should return a 400 when no body is provided', () => {
    return request
      .put(`localhost:4000/api/1.0/pizza/${pizzaID}`)
      .send({})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.message).toEqual('bad request');
      });
  });


  test('it should return a 404 when no body is provided', () => {
    let badID = 1234;

    return request
      .put(`localhost:4000/api/1.0/pizza/${badID}`)
      .send({name: 'code fellows'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('not found');
      });
  });
});


describe('PATCH /api/1.0/pizza', () => {

  test('it should update with a patch', () => {
    return request
      .patch(`localhost:4000/api/1.0/pizza/${pizzaID}`)
      .send({name: 'brian'})
      .then(res => {
        expect(res.text).toBe('pizza has been updated!');
        expect(res.status).toEqual(200);
      });
  });
});


describe('PATCH /api/1.0/pizza', () => {

  test('it should be able to delete a pizza', () => {
    return request
      .delete(`localhost:4000/api/1.0/pizza/${pizzaID}`)
      .then(res => {
        expect(res.text).toEqual('pizza has been deleted');
      });
  });
});
