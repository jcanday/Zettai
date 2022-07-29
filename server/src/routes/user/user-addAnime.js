const axios = require('axios')
const {AnimeInput} = require('../../graphql/types')

module.exports = async(req,res) => {
    const mutation = `mutation addAnime($title: String!,$trailer: String!, $episodes:Int!, $rating:String!, $status:String!, $synopsis:String!, $image:String!){
        addAnime( title:$title,trailer:$trailer,episodes:$episodes,rating:$rating,status:$status,synopsis:$synopsis,image:$image){
            title,trailer,episodes,rating,status,synopsis,image
        }}`

    const mutation2 = `mutation userAnimeUpdate($username: String!,$animeInput: ${AnimeInput}!){
        userAnimeUpdate(username:$username,animeInput:$animeInput){
            username,animes{title}
        }
    }`
    
    if (!req.body.trailer){
        req.body.trailer=""
    }
    try{   
        console.log(req.body.trailer)
        console.log(req.body.username)
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            {  
                query: mutation,
                variables: {
                    title:req.body.title,
                    trailer:req.body.trailer,
                    episodes:req.body.episodes,
                    rating:req.body.rating,
                    status:req.body.status,
                    synopsis:req.body.synopsis,
                    image:req.body.image
                } 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        console.log(data.data.addAnime)

        const { userUpdate } = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query:mutation2,
                variables:{
                    username:req.body.username,
                    animeInput:data.data.addAnime
                }
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        console.log(userUpdate)
        res.send({userUpdate:userUpdate, data:data})
    } catch(e) {
        console.log(e)
        res.redirect('/')
    }   
}