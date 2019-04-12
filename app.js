// Internal Module
const fs = require('fs')

const appConfig = require('./config/appConfig')

// External Module
const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')

const usersRoutes = require('./routes/users')
const jobsRoutes = require('./routes/jobs')
const commonRoutes = require('./routes/commonRoutes')

// const schema = require('./graphql/schema')
// const root = require('./graphql/resolvers')
// var graphqlHTTP = require('express-graphql');

const app = express();


// body parser for post methods
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

let modelsPath = './models'

fs.readdirSync(modelsPath).forEach(function (file) {
    console.log(modelsPath + '/' + file)
    if (~file.indexOf('.js')) require(modelsPath + '/' + file)
})


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE")

    next();
})

app.use('/user', usersRoutes)
app.use('/jobs', jobsRoutes)
app.use('/common', commonRoutes)


app.listen(appConfig.port, () => {

    let db = mongoose.connect(appConfig.db.url, ({ useNewUrlParser: true }))
    console.log('Port is running in ' + appConfig.port)
})


mongoose.connection.on('error', function (err) {
    if (err) {
        console.log(err)
    }
})

mongoose.connection.on('open', function (err) {
    if (err) {
        console.log(err)

    } else {
        console.log('connection successful')
    }
})
