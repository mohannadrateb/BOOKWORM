const express= require('express');
const router = express.Router();
const User= require('../models/user');
const Post = require('../models/posts');
const authenticate=require('../middleware/authenticate')



router.get('/profile',authenticate,(req,res)=>{
    //posts=[{post:"hkdfsjfjksjdkjlsdjk"},{post:"hkdfsjfjksjdkjlsdjk"}]
    console.log( "3ada el authentication");
    let user; let posts;
    User.findOne({"id": "5c4472540af4aa44f82238fc"})
    .then((data)=>{
            user = data;
            return Post.find();     
        })     
    .then((data)=>{      
                posts=data;
                console.log(posts);
                    return res.render('profile',{user,posts}); 
                    
                })
    .catch((err)=>{

                    console.log(err);
                    res.send(err);
                })
console.log( posts);
})

router.post('/post',authenticate,(req,res)=>{
        console.log( req.body);
        var newPost = new Post( Object.assign(req.body, {userid:req.user.id,username:req.user.firstName}) ).save(function(err,data){
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
router.get('/logout',authenticate,(req,res)=>{
     let authTken =  req.headers.cookie.substring(5);
     User.findbyTokenAndValidate(authTken)
     .then((user)=>{
        user.tokens = [];
        user.save();
     })
     .catch(()=>{
     res.status('401'); 
     })
    console.log('wesel la el logout')
    res.clearCookie('auth');
    res.json('wesel')   ;     
    });





router.get('/users',(req,res)=>{
    console.log("3amal el ajax request")
User.find({})
.then((users)=>{
    
    //console.log(users)
    res.json(users);
})
.catch((err)=>{
  console.log(err);



})




    

})

router.post('/search',(req,res)=>{
   console.log("3amal el search");
   
User.find({firstName:req.body.firstName})
.then((user)=>{
    console.log(user);
    console.log("this is the id the user");
    console.log(user[0]._id);
    res.json(user[0]._id);
})




    

})

router.get('/:id',(req,res)=>{
    use={}
   User.find({_id:req.params.id})
   .then((user)=>{
       console.log("this is the user")
    console.log(user)
       use=user
       console.log("this is use")
       console.log(use)
       return  Post.find({userid:req.params.id}) 
   })
    .then((posts)=>{
         console.log(posts)
        return res.render('profile-friends',{ posts,user:use })


    })
    .catch((err)=>{


        console.log(err);
    })

    
    
    
    
        
    
    })











 module.exports=router;