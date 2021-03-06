const jwt=require('jsonwebtoken')
const User = require('../models/User')

exports.isUserAuthenticated = async(req,res,next)=> {
    const {token} = req.cookies

    if(!token){
        return res.status(400).send({
            success:false,
            error:{
                message: 'Login first to access this resource'
            }
        })
    }

    const decode=jwt.verify(token,process.env.JWT_SECRECT)

    req.user=await User.findById(decode.id)
    next()
}

exports.authorizedRols=(...roles) => {
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).send({
                error:{
                    message: 'You are not allowed to access this resource'
                }
            })
        }
        next()
    }
}