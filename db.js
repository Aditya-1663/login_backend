const mongoose=require("mongoose")
// const mongouri="mongodb+srv://aditya_kumar:lEtsA7JEgdPKqNBJ@cluster0.ryydjda.mongodb.net/?retryWrites=true&w=majority"
const mongouri="mongodb+srv://aditya:aditya@userdata.badtav3.mongodb.net/?retryWrites=true&w=majority&appName=userdata"

const connectTomongo=async ()=>{ 
   
  try{  
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongouri)
    console.log("connected successfully") 
}
  catch(err){
      console.log(err) 
    }
}
module.exports=connectTomongo;