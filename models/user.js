// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let user = new Schema({

    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    userId: {
        type: String
    }
})

mongoose.model('User', user)

