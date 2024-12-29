const userTypeModel = require('../models/userType.model');

exports.createUserType= async(req,res)=>
{
    try{
        const userTypeId = req.user.userType;
        const myUserType = await userTypeModel.findById(userTypeId);
        if(myUserType.name === 'admin')
        {
    const userType = await userTypeModel.create(req.body);
    res.status(201).json(userType);
        }
        else
        {
            res.status(401).json({error : 'access denied, admins only'})
        }
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getUserTypes = async(req,res)=>{
    try{
        const userTypeId = req.user.userType;
        const myUserType = await userTypeModel.findById(userTypeId);
        if(myUserType.name === 'admin')
        {
const userTypes = await userTypeModel.find();
res.status(200).json(userTypes);
}
else
{
    res.status(401).json({error : 'access denied, admins only'})
}
    }catch(err){
        res.status(500).json({error:err.message});
    }
}