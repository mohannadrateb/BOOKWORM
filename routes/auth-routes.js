const express= require('express');
const router=express.Router();
const User= require('../models/user');
const bcrypt=require('bcrypt')

router.post('/login',(req,res)=>{
 let type="auth";
 let age= Date.now();




User.findOne({email:req.body.email})
.then((data)=>
{
    if(!data){
        return Promise.reject({

        message:"Wrong email"
    })


    }
    
return Promise.resolve(data);


}).then((data)=>{

    let token =User.generateToken();
    token={
    type:type,
    age:age,
    token:token


    };


   return User.findByIdAndUpdate(data.id,{email:'ayhaga@gmail'})
    .then((data)=>{
        console.log("wesel eno update");
        return Promise.resolve(data)
    })

}).then((data)=>{
    console.log("this is the part where the passwords are compared");
    return new Promise(function(resolve,reject){
    bcrypt.compare(req.body.password,data.password,function(err,hash){
        console.log(req.body.password);
        console.log(data.password);
        if(err){
            reject({
                
                 message:"password is not correct"
            })
        }
        console.log("el passwords sa7");
        resolve(data);




    })


})



}).then((data)=>{
    console.log("wesel eno y-redirect");
    console.log(data.id);
return res.json(data);


}).catch((err)=>{

return res.status(401).json({
message:"Error",
err


})

});




});




    






module.exports=router;