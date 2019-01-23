var express = require('express');
var authroutes = require('./routes/auth-routes');
var app = express();
var mongoose = require('mongoose');
var passportSetup = require('./config/passport-setup');
var keys=require('./keys');

app.set('view engine','ejs');

mongoose.connect(keys.mongodb.dbURL,()=>{
   console.log('db connected');
});
app.get('/',(req,res)=>{
  res.render('home');
});
app.use('/auth',authroutes);
app.listen(3000,()=>{
  console.log('started oauth20');
});
