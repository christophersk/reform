'use strict'

const express = require('express');
const router = express.Router();
const { Entity } = require('../db/models');

router.get('/', (req, res, next) => {
  Entity.findAll()
    .then(entities => res.json(entities))
    .catch(next)
})

module.exports = router;
