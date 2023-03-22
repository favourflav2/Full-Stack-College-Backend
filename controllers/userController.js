import User from "../model/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export async function sign_Up(req,res){
    const {userName,email,password} = req.body
    
    try{
     const alreadyUser = await User.findOne({email})
     if(alreadyUser){
         return res.status(404).json({msg:"Email is already being used"})
     }

     const saltRounds = 10
     const salt = await bcrypt.genSalt(saltRounds)
     const hash = await bcrypt.hash(password,salt)
     const user = await new User({userName,email,password:hash})
     await user.save()

     const token = jwt.sign({email:user.email, id:user._id},process.env.SECRET,{expiresIn:"2h"})
    
     res.status(200).json({user,token})

    }catch(e){
     console.log(e)
     res.status(404).json({msg:e.message})
    }
  
}

export async function log_In(req,res){
    const {email,password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({msg:"No Users By That Email"})
        }else{
            const token = jwt.sign({email:user.email,id:user._id},process.env.SECRET,{expiresIn:"2h"})
            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res.status(404).json({msg:"Passwords Did Not Match"})
            }else{
                return res.status(200).json({user,token})
            }
        }


    }catch(e){
        console.log(e)
        res.status(404).json({msg:e.message})
    }
}