import express from "express"
import morgan from "morgan"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import collegeRoutes from "./routes/collegeRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import helmet from 'helmet'


const app = express()



// Middleware
dotenv.config()
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
// cors options
const whiteList = [`${process.env.PRODUCTION_URL}`,`${process.env.LOCALHOST_URL}`]

var corsOptions = {
    origin: function (origin, callback) {
      if (whiteList .indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use(cors(corsOptions))


const port = process.env.PORT || 5001

// MongooseDb
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port, ()=>{
        console.log(`Listening running on port ${port}`)
    })
}).catch((e)=>{
    console.log(e.message)
})

app.use('/college',collegeRoutes)
app.use('/auth',userRoutes)