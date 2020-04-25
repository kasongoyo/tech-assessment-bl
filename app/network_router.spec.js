'use strict';

// dependencies
const request = require('supertest');
const app = require('./application');


describe('Network Router', () => {
    it('should retrieve networks successfully', function (done) {
        request(app)
            .get('/mobile-networks?country=tanzania')
            .expect(200)
            .end(done);
    });
});