const mongoose = require("mongoose")

const animeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique:true,
        },
        trailer: {
            type:String,
            required: false
        },
        episodes: {
            type:Number,
            required:true,
        },
        rating: {
            type:String,
            required:true
        },
        status: {
            type:String,
            required:true
        },
        synopsis: {
            type:String,
            required:true
        },
        genres: {
            type:Array,
            required:true
        },
        image:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('anime',animeSchema)