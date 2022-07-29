// this should handle the login form and do an axios post mutation 'login'


// this uses the login form and logs in user 

const axios = require('axios')
const { createJwtToken } = require('../../util/auth')
module.exports = async (req, res) => {
    const mutation = `
        mutation login($email: String!, $password: String!) { 
            login( email: $email, password: $password ) {
                username,
                email
            }
        }`

    if (!req.body.email || !req.body.password) {
        res.redirect('/signin')
        return;
    }

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query: mutation,
                variables: {
                    email: req.body.email,
                    password: req.body.password
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   
            
        const user = data.data.login
        const token = createJwtToken(user)
        
        res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true});
        res.redirect(`/profile/${user.username}`)
    } catch(e) {
        console.log(e.response.data.errors)
    }   
}