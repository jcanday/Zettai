const mongoose = require('mongoose')

const connectMongo = async () => {
    mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to MongoDB!`)
}

module.exports = {
    connectMongo
}