const jwt = require('jsonwebtoken');
  const secretKey ="cx#I6MgD('8-3{cuZ*-(o5/OwfAwpgrnxcD*}?YNf^W.$3Cj4:_4L_=@RBDn)+5";

  exports.createAccessToken = (data)=>{
    return jwt.sign(data,secretKey,{expiresIn:'1h'})
  }

  exports.authMW = (req,res,next)=>{
    try
    {
    const token = req.header('Authorization')?.replace('Bearer ','');
    if(token){
        const verified = jwt.verify(token,secretKey);
        req.user = verified;
        next();
    }
    else
    {
        res.status(401).json({error: 'Access denied, token missing'})
    }
}
    catch(err){
        res.status(401).json({error:err.message})
    }
  }