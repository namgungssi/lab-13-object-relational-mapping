'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');
const Game = require('../models/games.js');
const Platform = require('../models/platform.js');

describe('Games and Platforms tests', function(){

  beforeAll( () => {
    server.start();
    return Platform.remove({});
  });

  beforeAll( () => {
    return   Game.remove({});
  });

  afterAll( () => {
    server.stop();
  });

  let platformId;
  let gameId;

  describe('Invalid Route', function(){

    test('should respond with a 404 for invalid routes', function(){
      return superagent.get('http://localhost:3000/wrong')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(404);
        });

    });

  });

  describe('Platform Creation', function(){

    test('should successfully create a new platform', function(){
      return superagent.post('http://localhost:3000/platforms')
        .set('content-type', 'application/json')
        .send({
          name: 'Nintendo',
        })
        .then(res => {
          let text = JSON.parse(res.text);
          platformId = text._id;
          expect(res.status).toEqual(200);
          expect(text.name).toEqual('Nintendo');
          expect(text._id).not.toBe(null);
        });
    });

    test('should respond with a 400 if no name set', function(){
      return superagent.post('http://localhost:3000/platforms')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });

  });

  describe('Platform request', function(){

    test('should succesfully retrieve a platform by ID', function(){
      return superagent.get(`http://localhost:3000/platforms/${platformId}`)
        .then(res => {
          let text = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(text.name).toEqual('Nintendo');
          expect(text._id).toEqual(platformId);
        });
    });

    test('should send back an array with all platforms when no ID provided', function(){
      return superagent.get('http://localhost:3000/platforms')
        .then(res => {
          let text = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(Array.isArray([text])).toBe(true);
        });
    });

    test('should respond with 404 for bad ID', function(){
      return superagent.get('http://localhost:3000/platforms/5')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(404);
        });
    });

  });

  describe('Game Creation', function(){

    test('should successfully create a new game', function(){
      return superagent.post('http://localhost:3000/games')
        .set('content-type', 'application/json')
        .send({
          name: 'Mario',
          platforms: 'Nintendo',
        })
        .then(res => {
          let text = JSON.parse(res.text);
          gameId = text._id;
          expect(res.status).toEqual(200);
          expect(text.name).toEqual('Mario');
          expect(text.platforms).toEqual('Nintendo');
          expect(text._id).not.toBe(null);
        });
    });

    test('should respond with a 400 if body incomplete', function(){
      return superagent.post('http://localhost:3000/games')
        .set('content-type', 'application/json')
        .send({
          name: 'Zelda',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });

  });

  describe('Game Request', function(){

    test('should successfully retrieve a game by ID', function(){
      return superagent.get(`http://localhost:3000/games/${gameId}`)
        .then(res => {
          let text = JSON.parse(res.text);
          expect(res.status).toBe(200);
          expect(text.name).toEqual('Mario');
          expect(text._id).toEqual(gameId);
        });
    });

    test('should send back an array with all games when no ID provided', function(){
      return superagent.get('http://localhost:3000/games')
        .then(res => {
          let text = JSON.parse(res.text);
          expect(res.status).toBe(200);
          expect(Array.isArray([text])).toBe(true);
        });
    });

    test('should respond with a 404 for bad ID', function(){
      return superagent.get('http://localhost:3000/5')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(404);
        });
    });

  });

  describe('Game Delete', function(){

    test('should respond with a 200 when deleting a game by ID', function(){
      return superagent.delete(`http://localhost:3000/games/${gameId}`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    test('deleted game should be empty', function(){
      return superagent.get(`http://localhost:3000/games/${gameId}`)
        .then(res => {
          expect(res.text).toBe('');
        });
    });

    test('should respond with a 400 if no ID was sent', function(){
      return superagent.delete('http://localhost:3000/games')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });

    test('should respond with a 404 if bad ID sent', function(){
      return superagent.delete('http://localhost:3000/games/5')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(404);
        });
    });

  });

  describe('Platform Delete', function(){

    test('should respond with a 200 when deleting a platform by ID', function(){
      return superagent.delete(`http://localhost:3000/platforms/${platformId}`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    test('deleted platform should be empty', function(){
      return superagent.get(`http://localhost:3000/platforms/${platformId}`)
        .then(res => {
          expect(res.text).toBe('');
        });
    });

    test('should respond with a 400 if no ID was sent', function(){
      return superagent.delete('http://localhost:3000/platforms')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });

    test('should respond with a 404 if bad ID sent', function(){
      return superagent.delete('http://localhost:3000/platforms/5')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(404);
        });
    });

  });

});
