// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let jobs = new Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    skills: {
        type: Array
    },
    companyMail: {
        type: String
    },
    experience: {
        type: Number
    },
    userId: {
        type: String
    },
    name: {
        type: String
    }
})

mongoose.model('Jobs', jobs)