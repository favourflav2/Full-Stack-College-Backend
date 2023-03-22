import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    savedSchoolData:{
        type: [],
        default:[]
    },
    
})


const User = mongoose.model("user",userSchema)

export default User