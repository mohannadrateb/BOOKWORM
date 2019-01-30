const express= require('express');
const router=express.Router();
const User= require('../models/user');
const bcrypt=require('bcrypt')

router.post('/login',(req,res)=>{
 let type="auth";
 let age= Date.now();
 let token;
User.findOne({email:req.body.email})
.then((data)=>
{
    if(!data){
        return Promise.reject({

        message:"Wrong email"
    })
    }
return Promise.resolve(data);
})
.then((data)=>{
    // console.log("this is the part where the passwords are compared");
     //console.log(data);
     return new Promise(function(resolve,reject){
     bcrypt.compare(req.body.password,data.password,function(err,hash){
               //  console.log(req.body.password);
                 //console.log(data.password);
                 if(err){
                     reject({
                         
                     message:"password is not correct"
                     })
                 }
                 console.log("el passwords sa7");
                 resolve(data);        
     })
 })
})
.then((data)=>{
    user=data;
    return User.generateToken()
}) 
.then((data)=>{



            token=data;
            tokens={
                token:data,
                age:age,
                type:type
                
            };

        
        
            //console.log(user);

    return User.findByIdAndUpdate(user.id,{ $set: { 'tokens':[ tokens] }},{new:true})
    })
.then((data)=>{
                console.log("wesel eno update");
                console.log(data);
               // console.log(token);
            return Promise.resolve(data)
})
.then((data)=>{
    
    res.cookie("auth",data.tokens[0].token); 
    return res.json(data);
})
.catch((err)=>{
    return res.status(401).json({
    message:"Error",
    err
})
});


});

module.exports=router;