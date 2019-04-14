const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const shortid = require('shortid')

const jobs = require('../models/post')
const JobModel = mongoose.model('Jobs')

const model = require('../models/user')
const checkAuth = require('../middleware/check-auth')
const UserModel = mongoose.model('User')
const jobtags = require('../models/jobTags')
const AddJobsModel = mongoose.model('Jobtags')




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



router.post('/addJobTags', (req, res) => {

    let jobTags = new AddJobsModel({
        itemId: shortid.generate(),
        tags: req.body.tags
    })
    console.log('Request', req);
    jobTags.save((err, result) => {
        if(err) {

            let resObj = {
                message: 'Unable to add Jobs',
                status: 404,
                error: null,
                token: null,
                result: null
            }
            return res.send(resObj)
        } 
        return res.send(result);
    })
})

router.get('/getAllTags', (req, res) => {

    AddJobsModel.find().then(result => {    
        let resObj = {
            message: 'All tags',
            status: 404,
            error: null,
            token: null,
            result: result
        }
        return res.send(resObj)

    })
})

module.exports = router;
