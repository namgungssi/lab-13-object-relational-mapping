'use strict';



const expect = require('expect');
const superagent = require('superagent');
const mocha = require('mocha');
const server = require('../index.js');
process.env.MONGODB_URL || 'mongodb://localhost:27017/lab13';
const mongoose = require('mongoose');
const Pizza = require('../models/pizza.js');
const Beer = require('../models/beer.js');



describe('get routes', () => {
  it('should return 200 for a request made with a valid body', () => {
    return superagent.get('http://localhost:3000/pizza')
      .then( res => {
        expect(res.status).toBe(200);
      });
  });

  it('should return a 200 for a request w valid body', () => {
    return superagent.get('http://localhost:3000/beer')
    .then(res => {
      expect(res.status).toBe(200);
    });
  });

  it('should return the data for a request made with valid id', () => {
    return superagent.get('http://localhost:3000/beer')
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('beer');
      expect(res.body.Pizza_id).toBe(null);
    });
  });
  //needs to add the id provided ^

  it('should return 404 for an id that was not found', () => {
    return superagent.get('http://localhost:3000/pizza/')
      .catch( res => {
        expect(res.status).toBe(404);
      });
  });
});



describe('put routes', () => {
  it('should return a 200 with an updated id', () => {
    return superagent.put('http://localhost:3000/pizza/')
      .send({name: 'supreme'})
      .then( res => {
        expect(res.text).toBe('sucess');
      });
  });
//needs to add the id provided ^

  it('should return a 200 w an updated id', () => {
    return superagent.put('http://localhost:3000/beer/')
      .send({name: 'spacedust', price: 6})
      .then(res => {
        expect(res.text).toBe('success');
      });
  });
//needs to add the id provided ^

  it('should return 400 for a bad request with no body', () => {
    return superagent.put('http://localhost:3000/pizza')
      .send()
      .catch( res => {
        expect(res.status).toBe(400);
      });
  });

  it('should return 400 for a bad request w no body', () => {
    return superagent.put('http://localhost:3000/beer/')
      .send()
      .catch(res => {
        expect(res.status).toBe(400);
      });
  });
//needs to add the id provided ^

  it('should return 404 for a request made with an id that was not found', () => {
    return superagent.put('http://localhost:3000/pizza')
      .send({name: 'supreme'})
      .catch( res => {
        expect(res.status).toBe(404);
      });
  });
});

  it('should return a 404 for a request made an id that was not found', () => {
    return superagent.put('http://localhost:3000/beer')
    .send({name: 'spacedust'})
    .catch(res => {
      expect(res.status).toBe(404);
    });
  });
});

describe('post routes', () => {
  it('should return 200 for creating a valid resource', () => {
    return superagent.post('http://localhost:3000/pizza')
      .send({name: 'hawaiian', topping: 'pineapple bacon', price: '20'})
      .then( res => {
        expect(res.status).toBe(200);
      });
  });

  it('should return 200 for creating a valid resource', () => {
    return superagent.post('http://localhost:3000/beer')
    .send({name: 'spacedust', price: '6', Pizza_id: ''})
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body.Sushi_id).toBe('');
    });
  });
//add the id's in both '' slots

  it('should return a 400 for a bad request with no request body', () => {
    return superagent.post('http://localhost:3000/pizza')
      .send({name: 'Sausage Pizza'})
      .catch( res => {
        expect(res.status).toBe(400);
      });
  });

  it('should return a 400 for a bad request with no request body', () => {
    return superagent.post('http://localhost:3000/beer')
    .send({name: 'bud light'})
    .catch(res => {
      expect(res.status).toBe(400);
    });
  });
});
