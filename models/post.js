
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
    city: {
        type: String
    },
    userId: {
        type: String
    },
    name: {
        type: String
    },
    isApproved: {
        type: Boolean
    }
})

mongoose.model('Jobs', jobs)