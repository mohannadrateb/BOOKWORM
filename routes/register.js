const express= require('express');
const router= express.Router();
const User=require('../models/user');

router.post('/firsttime',(req,res)=>{
    let age= Date.now();
    let type='auth';
   //console.log('firsttime');
    User.generateToken().then((data)=>{
        console.log( "this is the data "+ data);
        tokens={
            token:data,
            age:age,
            type:type
            
        };
        
      console.log(tokens)


        var newUser= new User( Object.assign(req.body, {tokens:tokens})  ).save(function(err,data){
            console.log("register");
            console.log(data);
            if(err) throw err;
            
           // res.json(newUser);
            
            
            
            
           res.json(data);
            
            
             })
             
    })





})
module.exports=router;