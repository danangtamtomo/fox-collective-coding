'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/ChallengeController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('using /api')
})

module.exports = router
