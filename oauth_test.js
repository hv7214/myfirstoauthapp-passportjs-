var express = require('express');
var authroutes = require('./routes/auth-routes');
var profileroutes = require('./routes/profile-routes');
var app = express();
var mongoose = require('mongoose');
var passportSetup = require('./config/passport-setup');
var keys = require('./keys');
var cookieSession = require('cookie-session');
var passport = require('passport');

app.set('view engine','ejs');

app.use(cookieSession({
  maxAge:24*60*60*1000,
    keys:[keys.cookie.keyval]
}));

app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(keys.mongodb.dbURL,()=>{
   console.log('db connected');
});
app.get('/',(req,res)=>{
  res.render('home');
});
app.use('/auth',authroutes);
app.use('/profile',profileroutes);
app.listen(3000,()=>{
  console.log('started oauth20');
});
