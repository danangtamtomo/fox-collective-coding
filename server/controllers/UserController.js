'use strict'

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secret = 'lalalalala'
var challengeManager = require('../helpers/challengeManager')

let login = (req, res, next) => {
  let payload = req.body
  User.findOne({
    email: payload.email
  }).then((data) => {
    if (!data) {
      // kalau user tidak ada
      User.create({
          username: payload.name,
          email: payload.email,
          facebook_id: payload.id,
          status: true
        })
        .then((user) => {
          let token = jwt.sign({
            username: payload.name
          }, secret, {})

          challengeManager.notifyWhoIsLoggedIn(user)

          res.send({
            user: payload.email,
            token: token
          })
        })
        .catch((e) => {
          res.send({
            message: 'Login user and create token Something wrong!',
            error: e
          })
        })
    } else {
      // kalau user sudah ada didatabase
      let token = jwt.sign({
        username: payload.name
      }, secret, {})

      data.status = true
      data.save()
        .then(() => {
          challengeManager.notifyWhoIsLoggedIn(data)
        })

      res.send({
        message: 'use sudah ada, jadi hanya token yang dibuat',
        user: payload.email,
        token: token
      })
    }
  }).catch((e) => {
    res.send({
      message: 'ada yang salah waktu menjalankan method findOneOrCreate',
      error: e
    })
  })
}

let verifyToken = (req, res, next) => {
  let token = req.params.token

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.send({
        message: err
      })
    }

    if (!decoded) {
      res.send({
        user: false
      })
    } else {
      res.send({
        user: true
      })
    }
  })
}

module.exports = {
  login,
  verifyToken
}
