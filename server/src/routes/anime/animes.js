const axios = require('axios')

module.exports = async (req,res) => {
    const query = `
        query animes{
            title
        }`
    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query
            },
            {
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
        console.log("Animes",{data})
        res.send({data})
    } catch(e){
        console.log(e)
    }
    
}