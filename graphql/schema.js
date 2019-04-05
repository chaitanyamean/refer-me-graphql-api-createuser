const {buildSchema} = require('graphql')

var schema = buildSchema(`

type TextData {
    text: String!
    views: Int!
}

type RootQuery {
    hello: TextData!
}

type User {
   userName: String!
   password: String!
   _id: String!
   status: Int 
   result: String!    
}

input UserInputData {
    userName: String!
    password: String!
}

type RootMutation {
    createUser(userInput: UserInputData): User!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)

module.exports = {
    schema
}