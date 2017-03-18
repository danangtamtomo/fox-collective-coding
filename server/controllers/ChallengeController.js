'use strict'

const Challenge = require('../models/Challenge')
const cron = require('node-cron')
const moment = require('moment')
const fs = require('fs')
const vm = require('vm')
const challengeManager = require('../helpers/challengeManager')
const User = require('../models/User')
// var AnswerIncubator = require('../answerincubator')

let getChallenges = (req, res) => {
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

let createChallenge = (req, res) => {
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

let updateChallenge = (req, res) => {
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

let checkAnswer = (req, res) => {
  Challenge.findById(req.params.id)
    .then(function (challenge) {
      let answer = `
        try {
          function answer (${challenge.params}) {
            return ${req.body.answer}
          }
          answer()('${challenge.input}')
        } catch (err) {
          new SyntaxError('wrong syntax')
        }
        `
      let context = vm.createContext()
      let script = new vm.Script(answer, {
        displayErrors: true,
        timeout: 1000
      })
      res.send({
        status: challenge.output === script.runInContext(context),
        result: script.runInContext(context)
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
}

let checkOnline = (req, res) => {
  User.find({
    status: true
  })
    .then((users) => {
      res.send(users)
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
          .then((user) => {
            cron.schedule(`${moment().add(1 * (index + 1), 'm').format('m')} * * * *`, function () {
              challengeManager.notifyTurn(user.username)
            })
          })
      })
    })
}

let deleteChallenge = (req, res) => {
  Challenge.remove({
    _id: req.params.id
  })
    .then(() => {
      res.send({
        status: '200',
        message: 'A challenge has been deleted'
      })
    })
}

module.exports = {
  getChallenges,
  createChallenge,
  updateChallenge,
  checkAnswer,
  checkOnline,
  deleteChallenge
}
