const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../module/user"); 



const fetchuser=require('../middleware/fatchuser')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();

const jwt_secret="adityakumarisgoodBoy"


router.post(
  "/createuser",
  [
    body("name", "enter the valid name").isLength({ min: 3 }),
    body("email", "enter the valid email").isEmail(), 
    body("password", "password must be 6 charter").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // console.log(req.body)
    // const user=User(req.body)
    // user.save();
    // itf there aren  error return bad request and error
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
  try{

  
    //check whether the email is exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success=false
      return res
        .status(400)
        .json({  success, error: "Sorry a user with this already exists" });
    } 
    const slat=await bcrypt.genSalt(10)
    const  secpass=await bcrypt.hash(req.body.password,slat)
    
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        mobilenumber:req.body.mobilenumber,
        gender:req.body.gender,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        pincode:req.body.pincode,
        address:req.body.address,
        password: secpass,
      });

      const data={
        user:{
           id: user.id
        }

      }
     const authtoken= jwt.sign(data,jwt_secret)
    // console.log(jwt_data)

    // .then(user => res.json(user)).catch((err)=>{console.log(err)
    // res.send((`please enter the vaild input ${err.keyValue.email}`))});
    // res.send(req.body)
    // res.json(user)
    success=true
    res.json({ success, authtoken})
}
    catch(err){console.log(err)}
  }
);



//route: user login part 


router.post(
    "/login",
    [ 
     
      body("email", "enter the valid email").isEmail(),
      body("password", "password can not be blank").exists()
    ],
    async (req, res) => {
      // console.log(req.body)
      // const user=User(req.body)
      // user.save();
      // itf there aren  error return bad request and error
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

     const {email,password}=req.body;
     try {
        let user = await User.findOne({email});
        let success=false
        // console.log(user)
        if (!user) {
          return res
            .status(400)
            .json({ success, error: "wrong not match" });
        } 
        
        const passwordcom= await bcrypt.compare(password,user.password)
        if(!passwordcom){
          success=false
            return res
            .status(400)
            .json({ success,error: "already exists" });

        }
        
      const data={
        user:{
           id: user.id
        }

      }
     const authtoken= jwt.sign(data,jwt_secret)
    // console.log(jwt_data)

    // .then(user => res.json(user)).catch((err)=>{console.log(err)
    // res.send((`please enter the vaild input ${err.keyValue.email}`))});
    // res.send(req.body)
    // res.json(user)
    success=true
    res.json({success,authtoken})

     } catch (error) {
        console.log(error) 
        
     }


    
    
    })

 //route 3: get logging user details using "/api/auth/getuser" login required
 //middleware---------------------------->
 router.post(
  "/getuser",fetchuser,
  async (req, res) => { 
  try {
    const userId=req.user.id
    const user =await User.findById(userId).select("-password")
    res.send(user);
    
  } catch (error) {
    console.log(error)  

  }})



router.post("/updateprofile", fetchuser, async (req, res) => {
  try {
    // Create a new data object
    const newdata = {
      name: req.body.name,
      email: req.body.email, 
      mobilenumber: req.body.mobilenumber,
      gender: req.body.gender,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      address: req.body.address,
    };

    // Get the user ID from the request
    console.log(req.body.country)
    const userId = req.user.id;
    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: newdata },
      { new: true }
      ).select("-password");
      const data={
        user:{
           id: userId
        }

      }
     const authtoken= jwt.sign(data,jwt_secret)
      const success=true
    res.json({success,authtoken,updatedUser});
    // res.send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
 