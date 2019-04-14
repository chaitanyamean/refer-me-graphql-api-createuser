const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const jobs = require('../models/post')
const JobModel = mongoose.model('Jobs')


router.post('/addjobs', (req, res) => {

    let addjob = new JobModel({
        title: req.body.title,
        description: req.body.description,
        skills: req.body.skills,
        companyMail: req.body.companyMail,
        experience: req.body.experience,
        userId: req.body.userId,
        name: req.body.name,
        city: req.body.city,
        isApproved: req.body.isApproved
    })

    console.log(addjob)

    addjob.save((err, result) => {
        if (err) {
            let resObj = {
                message: 'Unable to add post',
                status: 404,
                error: null,
                token: null,
                result: null
            }
            return res.send(resObj)
        }

        let resObj = {
            message: 'Successfully added',
            status: 200,
            error: null,
            token: null,
            result: result
        }
        return res.send(resObj)
    })
})

module.exports = router;
