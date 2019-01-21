const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto= require('crypto');
const userSchema = new Schema({
 
    firstName:{
        type:String,
        required:[true,'First name is required']
    },
     
    lastName:{

       type:String,
       required:[true,'Last Name is required']

    },
    email:{
   type:String,
   required:[true,'email is required']
    },
    
     password:{
        type:String,
        required:[true,'Password is required']

     },
    bookGenre:{

        type:String,
        required:[true,'A Book Genre is required']
    },
    googleId:{

        type:String
    },
    facebookId:{

        type:String,
    },


    tokens: [{
        token:{
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        },
        type:{
            type: String,
            required: true,
            enum: ['auth', 'rpw', 'eval']
        }
    }]

})

userSchema.pre('save',function(next){

 var user= this
 if(user.isModified('password')){
  bcrypt.genSalt(10,(err,salt)=>
  {

bcrypt.hash(user.password,salt,(err,hashedPassword)=>{

user.password=hashedPassword;
next();


});

  });


 }
 else{

    next();
 }




});




userSchema.statics.generateToken = function(){
    return  new Promise(function(resolve){
        let length=20;
        let data = crypto.randomBytes(Math.ceil(length/2))
        .toString('hex').slice(0,length)
        .toUpperCase()
        console.log("fa el model " +data)
        return resolve(data);
    })
}
userSchema.statics.findbyTokenAndValidate = function(token){
    return User.findone({token})
    .then((user)=>{
        if(!user){
            return Promise.reject({
                message:"Unauthorized"
            })
        } else {
            let currentTime = Date.now();
            if(currentTime - user.token.age <= (60*24*60*1000)){
                return Promise.resolve(user);
            } else {
                return Promise.reject({
                    message:"Unauthorized"
                })
            }
        }  
    });
};


const User = mongoose.model('user',userSchema);
module.exports=User;