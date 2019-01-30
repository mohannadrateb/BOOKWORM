const mongoose= require('mongoose');
const Schema= mongoose.Schema;


const postSchema= new Schema({
post:{
type:String,
required:[true,'Post can not be empty']

},
likes:{
type: Number

},

disLikes:{

    type:Number,
},

comments:{

type: Array

},
userid:{
type:String


},
username:{

type:String
}

})


const Post = mongoose.model('post',postSchema);
module.exports =Post; 