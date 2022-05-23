var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
var don=null
var saltRounds = 10; 
//router.post('/login',login_validate);
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

var auth=require("../middleware/auth")

router.post("/login",  (req, res) => {
    var newUser = {};
    newUser.name = req.body.email;
    newUser.password = req.body.password;
    
     user_details.findOne({ email: newUser.name })
      .then(profile => {
        //console.log(profile.email)
        if (!profile) {
          res.send("User not exist");
        } else {
          var don=profile.email
          console.log(don,123456)
          bcrypt.compare(
            newUser.password,
            profile.password,
             (err, result) => {
              if (err) {
                console.log("Error is", err.message);
                res.json({
                  message:"password incorrect"
                })
              } else if (result == true) {
                const user={id:user_details._id}
                const token=jwt.sign({user},'my_secret_key',{ expiresIn: 360000 })
                //console.log(user.id)
                req.session.auth=true
                req.session.userId=profile.id
                console.log(req.session.userId)
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
router.get('/api/protected',(req,res)=>{
  console.log(req.token)
  const token = req.header("auth-token");
  jwt.verify(token,'my_secret_key',function(err,data){
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
  router.get('/logout',(req,res)=>{
    //jwt.destroy()
    req.session.destroy((err)=>{
      if (err) throw err
      else{
        res.json({
          message:'logout successfully'
        })
      }
    })
  })
module.exports=router
module.exports.don=don;
//module.exports=user