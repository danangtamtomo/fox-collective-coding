'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../config/db')

let ChallengeSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  question: String,
  answer: String,
  input: String,
  output: String,
  status: Boolean
}, {
  timestamps: true
})

let Challenge = mongoose.model('Challenge', ChallengeSchema)

module.exports = Challenge
