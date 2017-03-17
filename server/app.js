var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
const cors = require('cors')

var index = require('./routes/index')
var api = require('./routes/api')

var app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', index)
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = app
