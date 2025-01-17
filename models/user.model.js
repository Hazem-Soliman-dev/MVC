const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message:'Please enter a valid email address'
        }
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    phone:{
        type:String,
        unique:true,
        validate:{
            validator:(value)=>{
                return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value);
            },
            message:'Please enter a valid phone number'
        }
    },
    userType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userType',
        required:true,
        default:'677a49f36a92236b2f2c71f0'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('user',userSchema);