'use strict';



const expect = require('expect');
const superagent = require('superagent');
const mongoose = require('mongoose');
const mocha = require('mocha');
const server = require('../index.js');
process.env.MONGODB_URL || 'mongodb://localhost:27017/pizza';
const Pizza = require('../models/pizza.js');



describe('get routes', () => {
  it('should return 200 for a request made with a valid body', () => {
    return superagent.get('http://localhost:3000/pizza')
      .then( res => {
        expect(res.status).toBe(200);
      });
  });
  it('should return 404 for an id that was not found', () => {
    return superagent.get('http://localhost:3000/pizza')
      .catch( res => {
        expect(res.status).toBe(404);
      });
  });
});



describe('put routes', () => {
  it('should return a 200 with an updated id', () => {
    return superagent.put('http://localhost:3000/pizza')
      .send({name: 'Supreme'})
      .then( res => {
        expect(res.text).toBe('sucess');
      });
  });

  it('should return 400 for a bad request with no body', () => {
    return superagent.put('http://localhost:3000/pizza')
      .send()
      .catch( res => {
        expect(res.status).toBe(400);
      });
  });

  it('should return 404 for a request made with an id that was not found', () => {
    return superagent.put('http://localhost:3000/pizza')
      .send({name: 'Supreme'})
      .catch( res => {
        expect(res.status).toBe(404);
      });
  });
});



describe('post routes', () => {
  it('should return 200 for creating a valid resource', () => {
    return superagent.post('http://localhost:3000/pizza')
      .send({name: 'Hawaiian', topping: 'Pineapple & Bacon', price: '20'})
      .then( res => {
        expect(res.status).toBe(200);
      });
  });

  it('should return a 400 for a bad request with no request body', () => {
    return superagent.post('http://localhost:3000/pizza')
      .send({name: 'Sausage Pizza'})
      .catch( res => {
        expect(res.status).toBe(400);
      });
  });
});
