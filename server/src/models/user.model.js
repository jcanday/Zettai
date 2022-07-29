const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        email: {
            type:String,
            required:true,
            unique:true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Invalid Email",
            ]
        },
        animes:{
            type: Array,
            required:false
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("user",userSchema)