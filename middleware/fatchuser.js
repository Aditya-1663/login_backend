var jwt = require('jsonwebtoken');



const fetchuser=(req,res,next)=>{
    // Get the user from the jwt token and add id to request object
  const token=req.header("auth-token")//here the ..we get the token fron the header and tyhe name of header is auth-token i.e header(auth-token)
  if(!token){
    return(res.status(401).send({error:'Please authenticate using the valid token '}))
    
}
try {
    const data = jwt.verify(token,jwt_secret)
    req.user=data.user;
    next() //this next call the next function where this fatchuser function is used
    
} catch (error) {
      return(res.status(401).send({error:'Please authenticate using the valid token '}))
    
  }

}

const jwt_secret="adityakumarisgoodBoy"
module.exports=fetchuser;