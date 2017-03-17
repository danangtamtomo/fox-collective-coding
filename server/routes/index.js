'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/ChallengeController')

/* GET home page. */
router.get('/challenges', controller.getChallenges)
router.post('challenge', controller.createChallenge)
router.put('challenge/:id', controller.updateChallenge)

module.exports = router
