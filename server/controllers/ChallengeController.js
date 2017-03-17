'use strict'

const Challenge = require('../models/Challenge')
const cron = require('node-cron')
const moment = require('moment')
const fs = require('fs')
const challengeManager = require('../helpers/challengeManager')
// var AnswerIncubator = require('../answerincubator')

let getChallenges = (req, res, next) => {
  Challenge.find({}).then((data) => {
    if (!data) {
      res.send({
        message: 'Challenges is not found!'
      })
    } else {
      res.send({
        Challenges: data
      })
    }
  }).catch((e) => {
    res.send({
      message: 'Table challenge is not found!',
      error: e
    })
  })
}

let createChallenge = (req, res, next) => {
  Challenge.create(req.body).then((data) => {
    getPlaying()
    res.send({
      message: 'Data has been save!',
      challenge: data
    })
  }).catch((e) => {
    res.send({
      message: 'Something wrong!',
      error: e
    })
  })
}

let updateChallenge = (req, res, next) => {
  Challenge.findById(req.params.id).then((data) => {
    if (!data) {
      res.send({
        message: 'Challenge is not found!'
      })
    } else {
      data.update(req.body).then((result) => {
        res.send({
          message: 'Data has been updated!',
          challenge: result
        })
      })
    }
  }).catch((e) => {
    res.send({
      message: 'Something wrong!',
      error: e
    })
  })
}

let checkAnswer = (req, res, next) => {
  let answer = `
  function answer () {
    return ${req.body.answer}
  }
  module.exports = answer
  `
  fs.writeFileSync('answerincubator.js', answer)

  let answerincubator = require('../answerincubator')

  Challenge.findById(req.params.id)
    .then(function(challenge) {
      res.send({
        status: challenge.output === answerincubator()(challenge.input),
        result: answerincubator()(challenge.input)
      })
    })
}

let getPlaying = () => {
  User.find({
      status: true
    })
    .sort('updatedAt')
    .then((users) => {
      users.forEach((user, index) => {
        user.turn_order = index + 1
        user.save()
          .then(() => {
            cron.schedule(`* ${moment().add(2*(index+1), 'm').format('m')} * * *`, function() {
              challengeManager.notifyTurn()
            })
          })
      })
    })
}

module.exports = {
  getChallenges,
  createChallenge,
  updateChallenge,
  checkAnswer
}
