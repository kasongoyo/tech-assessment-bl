'use strict';

// dependencies
const expect = require('chai').expect;
const networkCtrl = require('./network_controller');

describe('Network controller', function () {
    
    it('should retrieve network name and country by mcc and mnc', function (done) {
        networkCtrl
        .find({mcc: 289, mnc: 88})
        .then(result => {
            expect(parseInt(result.mcc)).to.equal(289);
            expect(result.country).to.equal('Abkhazia');
            expect(/A-Mobile/.test(result.network)).to.be.true;
            done();
        })
    });

    it('should retrieve networks in a specific country based on mcc', function (done) {
        networkCtrl
        .find({mcc: 289})
        .then(result => {
            expect(result).to.have.lengthOf(3);
            done();
        })
    });
    it('should retrieve networks in a specific country based on country name', function (done) {
        networkCtrl
        .find({country: 'tanzania'})
        .then(result => {
            expect(result).to.have.lengthOf(10);
            done();
        })
    });
    
});