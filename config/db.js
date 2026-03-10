const mongoose=require('mongoose')

const connectDB=async ()=>{
  try{
    const conn= await mongoose.connect(process.env.MONGO_URI,{})
    console.log("Mongodb connected successfully");
  }
  catch(error){
    console.error("Error in Connecting to database")
    process.exit(1);
  }
}
module.exports=connectDB