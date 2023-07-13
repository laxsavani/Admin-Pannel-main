const jwt = require('jsonwebtoken')
const admins = require('../config/dataBase')

const admin_token=async(req,res,next)=>{
    var token = req.cookies.jwt
    console.log(token);
    if(token)
    {
         console.log("token generated");
         var userdata = await jwt.verify(token,process.env.KEY,(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            return data;
         })
         console.log(userdata);
         if(userdata==undefined)
         {
            res.redirect('/admin/login')
         }
         else
         {
            var datas = await admins.findById(userdata.userid)
            if(data==null)
            {
                res.redirect('/admin/register')
            }
            else
            {
                next();
            }
         }
    }
    else
    {
        res.redirect('/admin/login')
    }
}

module.exports = admin_token