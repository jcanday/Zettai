const axios = require('axios')

module.exports = async(req,res,next) => {

    const query = `query userByUsername($username: String!){
        userByUsername(username:$username){
            username,animes{title,synopsis,episodes,image,status,trailer}
        }
    }`
    // console.log(req.verifiedUser.user._id)
    let data = {}
    try{
        data  = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query,
                variables:{
                    username:req.body.username
                }
            },
            {
                headers:{
                    'Content-Type' : 'application/json',
                }
            });
        // const data = await animeData.data.userByUsername
        result = data.data.data.userByUsername
        console.log("AnimeDATA", {result})
        res.send({result})
    } catch(e){
        console.log(e)
    }
    next()
}