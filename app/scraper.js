'use strict';


const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.mcc-mnc.com/';

const scrapData = () => {
    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const networksTable = $('#mncmccTable > tbody > tr');
        const networks = [];
        networksTable.each(function () {
            // $('td', this).each(function(){
            //     console.log($(this).text());
            // });
            const currentRow = $(this);
            const network = {};
            // console.log(currentRow.find(`td:eq(${index})`));

            ['mcc', 'mnc', 'iso', 'country', 'countryCode', 'network'].forEach((key, index) => {
                network[key] = currentRow.find('td').eq(index).text();
            });
            networks.push(network);
        });
        const json = JSON.stringify(networks);
        fs.writeFile('mcc-mnc.json', json, 'utf8', function (err) {
            if (err) throw err;
            console.log('Scraped!');
        });
    })
    .catch(console.error);
}

module.exports = scrapData();