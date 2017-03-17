var express = require('express')
var router = express.Router()
var userControllers = require('../controllers/UserController.js')
var challengeControllers = require('../controllers/ChallengeController.js')
/* GET users listing. */
// routing user
// router.get('/user', userControllers.getUsers)
// router.get('/user/:id', userControllers.getUser)
router.post('/user', userControllers.login)
// router.post('/user', userControllers.logout)
// router.put('/user/:id', userControllers.updateUser)
// router.delete('/user/:id', userControllers.deleteUser)
router.get('/user/verify/:token', userControllers.verifyToken)

router.get('/user/checkonline', userControllers.checkOnline)

// routing challenge
router.get('/challenge', challengeControllers.getChallenges)
// router.get('/challenge/:id', challengeControllers.getChallenge)
router.post('/challenge', challengeControllers.createChallenge)
router.put('/challenge/:id', challengeControllers.updateChallenge)
router.post('/challenge/checkanswer/:id', challengeControllers.checkAnswer)
// router.delete('/challenge/:id', challengeControllers.deleteChallenge)

module.exports = router
