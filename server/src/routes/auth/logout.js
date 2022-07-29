module.exports = async (req,res) => {
    try {
        res.cookie('jwtToken','expiredToken',{expires: new Date(Date.now() + 1), httpOnly: true})
        res.redirect('/')
    } catch(e){
        console.log(e)
    }
}