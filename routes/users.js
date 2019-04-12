// Creation of user using Rest API's

const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')

const router = express.Router()



const model = require('../models/user')
// const location = require('../models/location')
const checkAuth = require('../middleware/check-auth')
const UserModel = mongoose.model('User')
// const LocationDB = mongoose.model('EdeLocationDB')


// localhost:3000/user/signup
router.post('/signup', (req, res) => {

    UserModel.findOne({ email: req.body.email }).then(result => {
        if (!result) {

            bcryptjs.hash(req.body.password, 10).then(hash => {

                let userDetails = new UserModel({
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    mobileNumber: req.body.mobileNumber,
                    userId: shortid.generate()
                })
                console.log('HASH', userDetails)

                userDetails.save((err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: 'Unable to create user',
                            result: null,
                            error: err
                        })
                    } else {
                        res.status(200).json({
                            message: 'User Created Successfully',
                            result: result,
                            error: null
                        })
                    }
                })
            }).catch(err => {
                res.status(500).json({
                    message: 'Some error occured',
                    result: null,
                    err: err
                })
            })
        } else {
            res.status(500).json({
                message: 'User Already exist',
                result: null,
                err: null
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Some error occured',
            result: null,
            err: err
        })
    })


})


// Email exist
// password correct entered
// generating auth token
// Creating Login router

router.post('/login', (req, res) => {
    let userDetails
    UserModel.findOne({ email: req.body.email }).then(user => {
        userDetails = user
        if (!user) {
            let resObj = {
                message: 'No User Found',
                status: 404,
                error: null,
                token: null,
                result: null
            }

            return res.send(resObj)
        }

        bcryptjs.compare(req.body.password, user.password).then(isMatch => {
            if (!isMatch) {
                let resObj = {
                    message: 'Password incorrect',
                    status: 404,
                    error: null,
                    token: null,
                    result: null
                }

                return res.send(resObj)
            }

m
            let token = jwt.sign({ name: userDetails.name, userId: userDetails._id },
                'thisissecretkeyanditisverylong')

            if (token) {

                let resObj = {
                    message: 'Login Successful',
                    status: 200,
                    error: null,
                    token: token,
                    result: userDetails
                }
                return res.send(resObj)
            } else {

                let resObj = {
                    message: 'Unable to generate token',
                    status: 404,
                    error: null,
                    token: null,
                    result: null
                }

                return res.send(resObj)
            }
        })
    }).catch(err => {
        console.log(err)

    })
})





// Checkauth
// username
// password compare
// new password hasing
// update the new password

// userName
// oldPassword
// newPassword
// confirmPassword

router.post('/change-password', checkAuth, (req, res) => {


    UserModel.findOne({ userName: req.body.userName }).then(user => {

        if (!user) {

            let resObj = {
                message: 'No User Found',
                status: 404,
                error: null,
                token: null,
                result: null
            }

            return res.send(resObj)
        }


        bcryptjs.compare(req.body.oldPassword, user.password).then(isMatch => {


            if (!isMatch) {
                let resObj = {
                    message: 'Old password is not matching',
                    status: 404,
                    error: null,
                    token: null,
                    result: null
                }

                return res.send(resObj)

            }

            bcryptjs.hash(req.body.newPassword, 10).then(hash => {

                options = {
                    userName: req.body.userName,
                    password: hash
                }

                UserModel.update({ userName: req.body.userName }, options).then(result => {

                    if (result) {
                        return res.send(result)
                    } else {
                        return res.send('unable to save new password')

                    }
                })

            })
        })
    })

})

module.exports = router;