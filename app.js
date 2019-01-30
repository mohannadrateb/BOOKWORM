const express= require('express');
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const registerRoutes= require('./routes/register');
const userRoutes= require('./routes/user');

//init app
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//init passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))
//set up routes
//app.use('/auth', authRoutes);

//set up the template engine
app.set('view engine','ejs');


app.get('/',(req,res)=>{

res.render('home');


});

app.use('/api/auth',authRoutes);
app.use('/api/register',registerRoutes);
app.use('/api/user',userRoutes);
// connection to the database

mongoose.connect('mongodb://localhost:27017/BOOKWARM',{useNewUrlParser: true});

mongoose.connection.on('connected', function(){

console.log("The connection to the database was made");

});

mongoose.connection.on('error', function(){


console.log("was not able to connect to the database");

})

app.listen(3000,function(){

console.log("app now listening for requests on port 3000");


})