
const passport=require('passport');
const googlestrategy=require('passport-google-oauth20');
const user = require('../models/user-models');
const keys = require('../keys');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
user.findById(id).then((user)=>{
  done(null,user);
});
  done(null,user.id);
});

passport.use(
    new googlestrategy({
    //options for googlestrategy
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
  },(accessToken,refreshToken,profile,done) => {
   //check if user exists
   user.findOne({googleID:profile.id}).then((currentUser)=>{
     if(currentUser)
     {done(null,currentUser)

     }
     else
      {   new user({
         username: profile.displayName,
         googleID: profile.id
       }).save().then((newuser)=>{
         console.log('new user created:'+newuser);
         done(null,newuser);
       });
     }
   });

  })
);
