// I create my table types here. 

const { GraphQLObjectType, GraphQLInputObjectType, 
	GraphQLID, GraphQLString, GraphQLList, GraphQLInt, 
	GraphQLBoolean, GraphQLFloat } = require('graphql')

const { User, Anime } = require('../models')

const UserType = new GraphQLObjectType({
    name:'User',
    description:'User Type',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        email: { type: GraphQLString},
        animes: {
            type: new GraphQLList(AnimeType)
        },
        followers: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find()
            }
        }
    })
})

const AnimeType = new GraphQLObjectType({
    name:'Anime',
    description:'Anime Type',
    fields: () => ({
        id: {type: GraphQLID},
        title:{type: GraphQLString},
        trailer:{type: GraphQLString},
        episodes:{type: GraphQLInt},
        rating:{type:GraphQLString},
        status:{type:GraphQLString},
        synopsis:{type:GraphQLString},
        image:{type:GraphQLString}
        // genre:{type: new GraphQLList()}
    })
})

const AnimeInput = new GraphQLInputObjectType({
    name:"AnimeInput",
    fields:{
        title:{type: GraphQLString},
        trailer:{type: GraphQLString},
        episodes:{type: GraphQLInt},
        rating:{type:GraphQLString},
        status:{type:GraphQLString},
        synopsis:{type:GraphQLString},
        image:{type:GraphQLString}
    }
})


module.exports = {UserType,AnimeType,AnimeInput}