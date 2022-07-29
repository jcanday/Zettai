const axios = require('axios')
const { GraphQLID } = require('graphql')

const userData = async (req, res, next) => {
    if (!req.verifiedUser) {
        next()
        return
    }

    const query = `query userByUsername($username: String!){
        userByUsername(username:$username){
            animes{title,synopsis,episodes,image,status,trailer}
        }
    }`
    // console.log(req.verifiedUser.user._id)
    let data = {}
    try {
        data = await axios.post(process.env.GRAPHQL_ENDPOINT, 
        { 
            query,
            variables: {
                username:req.verifiedUser.user.username
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
    } catch(e) {
            console.log(e)
    }
    // console.log(data.data.data.userByUsername)
    req.verifiedUser.user.animes = data.data.data.userByUsername?.animes ?? []

    next()
}

module.exports = { userData }