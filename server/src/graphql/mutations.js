// This is where ill set up the Create Update and Delete mutations and others

const { GraphQLID,GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLInt, GraphQLInputObjectType } = require('graphql')
const { User, Anime} = require('../models')
const { createJwtToken } = require('../util/auth')
const { UserType, AnimeType,AnimeInput } = require('../graphql/types')




const register = {
    type: GraphQLString,
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: { type: GraphQLString}
    },
    async resolve(parent,args){
        const checkUser = await User.findOne({email: args.email})
 
        if(checkUser){
            throw new Error(`${args.email} already exists!`)
        }

        const {username, email, password } = args
        const user = new User({username,email,password})
        await user.save()
        const token = createJwtToken(user)
        return token
    }
}

const login = {
    type: UserType,
    args: {
        email: {type: GraphQLString},
        password:{type: GraphQLString}
    },
    async resolve(parent,args){
        const user = await User.findOne({email:args.email})
        if(!user){
            throw new Error(`${args.email} is not a user!`)
        } else if(args.password !== user.password){
            throw new Error(`Invalid Password`)
        }
        return user
    }
}
// This will add anime(create one in db if it already doesnt exists) to Current User
const addAnime = {
    type: AnimeType,
    args: {
        title:{type: GraphQLString},
        trailer:{type: GraphQLString},
        episodes:{type: GraphQLInt},
        rating:{type:GraphQLString},
        status:{type:GraphQLString},
        synopsis:{type:GraphQLString},
        image:{type:GraphQLString}
    },
    async resolve(parent,args){
        const anime = await Anime.findOne({title: args.title})
        if(!anime){
            const {title,trailer,episodes,rating,status,synopsis,image} = args
            const anime = new Anime({title,trailer,episodes,rating,status,synopsis,image})
            await anime.save()
            return anime
        } 
        return anime
    }
}

const userAnimeUpdate = {
    type:UserType,
    description:"Updates User with new Anime",
    args:{
        username:{type:GraphQLString},
        animeInput:{type: AnimeInput}
    }, 
    async resolve(parent,args){
        await User.updateOne({username:args.username},{$push : { animes : args.animeInput}})
        const user = await User.findOne({username:args.username})
        if(!user){
            throw new Error(`Couldnt find User`)
        }
        return user
    }
}
const deleteAnime = {
    type:UserType,
    description:"Deletes a single anime from user",
    args:{
        title:{type:GraphQLString},
        username:{type:GraphQLString}
    },
    async resolve(parent,args){
        await User.updateOne({username:args.username},{$pull : { animes : { title: args.title}}})
        const user = await User.findOne({username:args.username})
        return user
    }
}
const emptyAnime = {
    type: new GraphQLList(AnimeType),
    description: "Deletes all anime in the system",
    args:{
        title:{type:GraphQLString}
    },
    async resolve(parent,args){
        Anime.remove({title:args.title})
        return Anime.find()
    }
}

module.exports = { register, login, addAnime, userAnimeUpdate, emptyAnime,deleteAnime }