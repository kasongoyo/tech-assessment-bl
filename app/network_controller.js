'use strict';

const data = require('../mcc-mnc.json');

/**
 * 
 */
const ctrl = {
    find(query){
        if(query.mcc && query.mnc){
            const found =  data.find(network => {
                console.log(query);
                return parseInt(network.mcc) === parseInt(query.mcc) && parseInt(network.mnc) === parseInt(query.mnc);
            });
            return found ? Promise.resolve(found) : Promise.resolve([]);
        }
        if((query.mcc || query.country) && !query.mnc){
            const found = data.filter(network => parseInt(network.mcc) === parseInt(query.mcc) || network.country.toUpperCase() === (query.country || '').toUpperCase());
            return Promise.resolve(found);
        }
        return Promise.resolve([]);
    }
}

module.exports = ctrl;