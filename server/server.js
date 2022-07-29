const express = require('express')
const dotenv = require('dotenv')
const { connectMongo } = require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const { authenticate } = require('./src/middleware/auth')
const { userData } = require('./src/middleware/userData')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()
dotenv.config()


connectMongo()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//keeps cookies for users
app.use(cookieParser())

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))


app.use(express.urlencoded({ extended: true }))
// set the view engine to ejs
app.set('view engine', 'ejs');

// update location of views folder that res.render pulls from
app.set('views', path.join(__dirname, '/src/templates/views'));

// this makes sure my authenticate middle ware runs
app.use(authenticate)
app.use(userData)

// this pulls my routes from my routes folder 
require("./src/routes")(app)


// Starts my server and listens to my port startin
app.listen(process.env.PORT, () => {
    console.log(`Port Number == ${process.env.PORT}`)
});

