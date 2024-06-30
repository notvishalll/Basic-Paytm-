require('dotenv').config();
const jwt = require('jsonwebtoken')

function authmid(req,res,next){
    const authheader = req.headers.authorization;

    if (!authheader || !authheader.startsWith('Bearer')){
        return res.status(403).json({
            Error:"wrong Headers"
        })
    }
    const token = authheader.split(' ')[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_KEY);

        req.userid = decoded.userid;
        next();
    } catch (error) {
        return res.status(411).json({
            Error:"authentication"
        })
    }
}



module.exports = {
    authmid
}