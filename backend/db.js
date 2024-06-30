const mongoose = require("mongoose");
require('dotenv').config()
mongoose.connect(process.env.mongo)
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        min:3,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:6
    },
    firstname:{
        type:String,
        required:true,
        max:12,
        captalize:true
    }
    ,
    lastname :{
        type:String,
        required:true,
        max:12,
        captalize:true
    }
})
const accountSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{type:Number,required:true,default:0}
})

const User = mongoose.model('user', userSchema)
const Account = mongoose.model('Account',accountSchema)
module.exports = {
    User,
    Account
}