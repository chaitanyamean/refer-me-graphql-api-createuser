const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')

const UserModel = mongoose.model('User')


var root = {
    hello() {
        return {
            text: 'hello World',
            views: 100
        }
    },
    createUser: async function({userInput}, req) {

        const existingUser = await UserModel.findOne({userName: userInput.userName});

        if(existingUser) {
            throw new Error('Already Exist')
        }

        const hashPwd = await bcryptjs.hash(userInput.password, 10);

        const user = new UserModel({
            userName: userInput.userName,
            password: hashPwd
        });
        const createdUser = await user.save();
        console.log('ss', createdUser)
        if(createdUser) {
            return{...createdUser._doc, _id:createdUser._id.toString(), status: 200, result: 'Successfully created'};
        } 

        return null

    }
}

module.exports = {
    root
}