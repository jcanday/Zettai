// This can be used to query data from my db


const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { UserType, AnimeType } = require('./types')
const { User, Anime } = require('../models')


const users = {
    type: new GraphQLList(UserType),
    description: 'Retrieve all Users',
    resolve(parent,args){
        return User.find()
    }
}

const animes = {
    type: new GraphQLList(AnimeType),
    description: 'Retrieve all anime watched by everyone',
    resolve(parent,args){
        return Anime.find()
    }
}

const userByUsername = {
    type: UserType,
    description:'Retrieve user by username',
    args:{
        username:{type:GraphQLString}
    },
    resolve(parent,args){
        const user = User.findOne({username:args.username})
        return user
    }
}

const animeByTitle = {
    type: AnimeType,
    description: 'Return anime title by UserID',
    args:{
        title: {type: GraphQLString}
    },
    resolve(parent,args){
        return Anime.findOne({title: args.title})
    }
}


module.exports = { users,userByUsername, animes, animeByTitle}