const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const jobs = require('../models/post')
const JobModel = mongoose.model('Jobs')

const model = require('../models/user')
// const location = require('../models/location')
const checkAuth = require('../middleware/check-auth')
const UserModel = mongoose.model('User')

router.get('/getAllJobs', (req, res) => {

    JobModel.find().then(result => {
        return res.send(result)
    })
})

router.get('/getAllUsers', (req, res) => {
    UserModel.find().then(result => {
        return res.send(result)
    })
})


module.exports = router;
