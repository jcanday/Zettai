const axios = require('axios')

module.exports = async (req,res) => {
    const mutation = `
        mutation deleteAnime($title:String!,$username:String!){
            deleteAnime(title:$title,username:$username){
                username
            }
        }`
    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query:mutation,
                variables:{
                    username:req.body.username,
                    title:req.body.title
                }
            },
            {
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
        res.send({data})
    } catch(e){
        console.log(e)
    }
    
}