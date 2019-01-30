const User=require('../models/user');

const authenticate = (req, res, next) => {
    let authTken =  req.headers.cookie.substring(5);
     

    console.log(authTken);
    return User.findbyTokenAndValidate(authTken)
    .then((user)=>{
        if (user){
            req.user = user 
        console.log("found the user")
        return next();
        }
        else return Promise.reject()
    })
    .catch((err)=>{
        console.log( "msh l2ay el token");
        console.log( err);
    res.status('401');                                                                                                                                                    

    })
  
  

 
   
 


}
module.exports = authenticate;