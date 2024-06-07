const mongoose = require("mongoose")
// const {Schema} =mongoose
const userschrma=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobilenumber:{

        type:Number,
        require:true
    },
    gender:{

        type:String,
        require:true
    },
    country:{

        type:String,
        require:true
    },
    state:{

        type:String,
        require:true
    },
    city:{

        type:String,
        require:true
    },
    pincode:{

        type:Number,
        
    },
    address:{

        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const User =mongoose.model("user",userschrma)
// User.createIndexes();
module.exports=User