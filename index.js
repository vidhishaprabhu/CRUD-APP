const express=require('express');
const app=express()
const dotenv=require('dotenv')
dotenv.config({path:'./config/config.env'})
const connectDB=require('./config/db');
const morgan = require('morgan');
connectDB()
const studentRoute=require('./routes/student');
app.use(express.json())
app.use(morgan('dev'));
app.use("/api/student",studentRoute);
app.listen((process.env.PORT),()=>{
  console.log(`Server started at port ${process.env.PORT}`)
})