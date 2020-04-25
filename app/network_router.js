'use strict';

// dependencies
const express = require('express');
const router = express.Router();
const networkCtrl = require('./network_controller');

router.get('/mobile-networks', (req, res, next) => {
    networkCtrl
        .find(req.query)
        .then(result => res.json(result))
        .catch(error => next(error));
});

module.exports = router;