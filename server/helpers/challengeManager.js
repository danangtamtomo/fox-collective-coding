const cron = require('node-cron')
const firebase = require('firebase')
require('dotenv').config()

var challengeManager = {}
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

challengeManager.notifyWhoIsLoggedIn = function (user) {
  this.writeLoginUser(user)
}

challengeManager.notifyWhoIsLoggedOff = function (user) {
  this.removeLoginUser(user)
}

challengeManager.removeLoginUser = function (user) {
  firebase.database().ref('newoffline/').set({
    newonline: user._id
  })
}

challengeManager.writeLoginUser = function (user) {
  firebase.database().ref('newonline/').set({
    newonline: user._id
  })
}

challengeManager.notifyWhoIsLoggedIn({
  _id: 'danang',
  name: 'Danang Aji Tamtomo'
})

module.exports = challengeManager
