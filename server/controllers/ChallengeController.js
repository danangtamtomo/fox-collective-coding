'use strict'

const Challenge = require('../models/Challenge')
var fs = require('fs')
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
    .then(function (challenge) {
      res.send({
        status: challenge.output === answerincubator()(challenge.input),
        result: answerincubator()(challenge.input)
      })
    })
}

module.exports = {
  getChallenges,
  createChallenge,
  updateChallenge,
  checkAnswer
}
