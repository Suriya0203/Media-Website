var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')

var saltRounds = 10; 
//router.post('/login',login_validate);
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

router.post("/login",  (req, res) => {
    var newUser = {};
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    
     user_details.findOne({ name: newUser.name })
      .then(profile => {
        if (!profile) {
          res.send("User not exist");
        } else {
          bcrypt.compare(
            newUser.password,
            profile.password,
             (err, result) => {
              if (err) {
                console.log("Error is", err.message);
              } else if (result == true) {
                const user={id:user_details._id}
                const token=jwt.sign({user},'my_secret_key')
                res.json({
                  token:token,
                data:profile});
              } else {
                res.send("User Unauthorized Access");
              }
            }
          );
        }
      })
      .catch(err => {
        console.log("Error is ", err.message);
      }); 
      //console.log(req.user_details.id)
  });
router.get('/api/protected',ensuretoken,(req,res)=>{
  console.log(req.token)
  jwt.verify(req.token,'my_secret_key',function(err,data){
    if(err){
      res.send(err)
    }
    else{
      res.json({
        Text:'this is protected',
        data:data
      })
    }
  })  
})

function ensuretoken(req,res,next){
  const bearerHeader=req.headers['authorization']
  if(typeof bearerHeader!='undefined'){
    const bearer=bearerHeader.split(" ")
    const bearerToken=bearer[1]
    req.token=bearerToken
    console.log(bearerToken)
    next()
  }else{
    res.send('error')
  }
}

router.post("/signup",  (req, res) => {
    
    var newUser = new user_details({
      name: req.body.name,
      password: req.body.password,
      email:req.body.email,
      gender:req.body.gender,
      phone:req.body.phone
    });
  
     user_details.findOne({ email: newUser.email })
      .then( profile => {
        if (!profile) {
          bcrypt.hash(newUser.password, saltRounds,  (err, hash) => {
            if (err) {
              console.log("Error is", err.message);
            } else {
              newUser.password = hash;
               newUser
                .save()
                .then(() => {
                  res.status(200).send(newUser);
                })
                .catch(err => {
                  console.log("Error is ", err.message);
                });
            }
          });
        } else {
          res.send("User already exists...");
        }
      })
      .catch(err => {
        console.log("Error is", err.message);
      });
  });
module.exports=router