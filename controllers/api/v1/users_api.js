const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');


module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        
        if(!user){
            return res.json(422 ,{
                message:'Invalid User'
            });
        };

        if(user.password != req.body.password){
            return res.json(422,{
                message:'Invalid Password'
            });
        };

        return res.json(200,{
            message: 'Sign In successfully!!',
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret_or_key,{expiresIn:100000})
            }
        })

    }catch(err){
        return res.json(500,{
            message:'Internal Sever error'
        })

    };



}