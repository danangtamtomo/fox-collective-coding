'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../config/db')

let userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  email: String,
  facebook_id: Number
}, {
  timestamps: true
})

let User = mongoose.model('User', userSchema)

module.exports = User
