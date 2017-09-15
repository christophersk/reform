'use strict'

const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({
  secret: 'keyboard cat',
  saveUninitialized: false,
  resave: false
}))

module.exports = router;
