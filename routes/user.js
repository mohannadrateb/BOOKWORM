const express= require('express');
const router = express.Router();
const User= require('../models/user');
const Post = require('../models/posts');



router.get('/profile/:id',(req,res)=>{
    //posts=[{post:"hkdfsjfjksjdkjlsdjk"},{post:"hkdfsjfjksjdkjlsdjk"}]
    let user; let posts;
    User.findOne({"_id": req.params.id})
        .then((data)=>{
            
            user = data;
            return Post.find({})
             
        })     
        .then((data)=>{
                       
                posts=data;
                    //console.log(posts);
                    res.render('profile',{user,posts}); 
                })
     

console.log( posts);






})

router.post('/post',(req,res)=>{
     
        console.log( req.body);
        var newPost = new Post(req.body).save(function(err,data){
        if(err) throw err;

        res.json(data);
   



    })






})




router.get('/post',(req,res)=>{
     


    Post.find({},function(err,posts){
     console.log(posts);
        if (err) throw err;
        res.status(200).json(posts);
        
    
    });
    




})










 module.exports=router;