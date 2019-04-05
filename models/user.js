// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let user = new Schema({

    userName: {
        type: String
    },
    password: {
        type: String
    }
})

mongoose.model('User', user)

