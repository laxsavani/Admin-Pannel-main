const jwt = require('jsonwebtoken')

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
            // res.redirect()
            next()
         }
    }
    else
    {
        res.redirect('/admin/login')
    }
}

module.exports = admin_token