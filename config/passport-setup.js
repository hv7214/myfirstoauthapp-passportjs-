const passport=require('passport');
const googlestrategy=require('passport-google-oauth20');
const user = require('../models/user-models');
passport.use(
    new googlestrategy({
    //options for googlestrategy
    callbackURL:'/auth/google/redirect',
    clientID:'466078988699-j90vn59mligtec3fe8ro4585ibfm9jfj.apps.googleusercontent.com',
    clientSecret:'PKsNLmwk5VFgOFwdyCDQOKsd'
  },(accessToken,refreshToken,profile,done) => {
   //check if user exists
   user.findOne({googleID:profile.id}).then((currentUser)=>{
     if(currentUser)
     {

     }
     else
      {   new user({
         username: profile.displayName,
         googleID: profile.id
       }).save().then((newuser)=>{
         console.log('new user created:'+newuser);
       });
     }
   });

  })
);
