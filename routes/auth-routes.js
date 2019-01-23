var router=require('express').Router();
var passport=require('passport');

router.get('/login',(req,res)=>{
  res.render('login');
});
router.get('/logout',(req,res)=>{
  res.render('logging out');
});

router.get('/google',passport.authenticate('google',{
  scope:['profile']
}));
router.get('/google/redirect', passport.authenticate('google'),(req,res)=>{
  res.send("logged-callback");
});

module.exports=router;
