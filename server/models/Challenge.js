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
  answers / boogle - 2. js
  slug: String,
  status: Boolean
}, {
  timestamps: true
})

let Challenge = mongoose.model('Challenge', Challenge)

module.exports = Challenge
