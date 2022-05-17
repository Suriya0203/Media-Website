
var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
var auth=require("../middleware/auth")

var User=require('./login')
router.get('/profile/:id',auth,(req,res)=>{
    id=req.params.id
    console.log(User.don)
    console.log(req.user_details)
    user_details.findById(id,(err,data)=>{
        if(!err){
            res.json({
              data:data,
              user:req.user
            })
        }
        else{
            console.log(err)
        }
    })
})


router.put('/addfriend',auth,async(req,res)=>{
    //console.log(User.)
    user_id=req.body.user_id
    friend_id=req.body.friend_id
    console.log(user_id)
    console.log(friend_id)
    const friend=await user_details.findByIdAndUpdate(user_id,{
      
      $push:{friends:{friendid:friend_id}}
      
    }
    )
    .then(result=>{
      res.json({
        message:'friend added successfully '
      })
    })
    .catch(err=>{
      res.json({
        error:err
      })
    })
  })
  router.get("/search/:id",auth,(req,res)=>{
    const search=user_details.findById(req.params.id,(err,data)=>{
      if(!err){
        res.send(data)
      }
      else{
        console.log(err)
      }
    })
  })

module.exports = router; 