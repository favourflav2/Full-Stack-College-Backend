import { json } from 'express';
import jwt from 'jsonwebtoken'

export async function authMiddleware(req,res,next){
    try{
        // if the token is verified we are going to save the userId as req.userId
        const token = req.headers.authorization.split(' ')[1] 
        let decodedData;

        if(token){
            decodedData = jwt.verify(token,process.env.SECRET)
            req.userId = decodedData?.id
            next()
        }else{

            return res.status(400).json({msg:"No valid token"}) 
        }

    }catch(e){
        console.log(e)
    }
}

// export async function authMiddleware(req,res,next){
//     try{
//         const token = req.headers.authorization.split(' ')[1]
//         // Checking if the token is from google or a custom jwt
        
//         const notCustomAuth = token.length > 30
//         let decodedData;

//         if(token && notCustomAuth){
//             decodedData = jwt.verify(token,process.env.SECRET)
            
//             //! VERY IMPORTANT
//             //* req.userId is not real... We are creating a req.userId
//             // Once we create the req.userId
//             //* We decode the token and set the id of the logged user as the req.userId
//             // So when this middleware is ran 
//             // TODO It takes the logged in users Id and stores it in req.userId
//             // ! This happens before we get to a ROUTE MIDDLEWARE
//             req.userId = decodedData?.id
            
//         }else{
            
//              const user = await User.findOne({googleId:token})
//              //console.log(user)
//              req.userId = user._id
           
//         }
        
//         next()

//     }catch(e){
//         console.log(e)
        
//     }
// }