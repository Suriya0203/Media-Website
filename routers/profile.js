
var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
var auth=require("../middleware/auth")
var Mongoose=require("mongoose")
var User=require('./login')
const { route } = require("./post")
router.get('/profile/:id',auth,(req,res)=>{
    id=req.params.id
    console.log(User.don)
    //const {ide}=req.user
    //console.log(ide)
    console.log(req.user_details)
    user_details.findById(id,(err,data)=>{
        if(!err){
            res.json({
              //data:data,
              name:data.name,
              email:data.email,
              gender:data.gender,
              phone:data.phone,
              friends:data.friends,
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
    //user_id=req.body.user_id
    friend_id=req.body.friend_id.toString()
    let posts = await user_details.findById(req.session.userId);
    console.log(friend_id)
    // if (!posts) {
    //   res.json({
    //     message:`No post with id${req.body.id}`
    //   })
    //   //throw new NotFoundError(`No post with id${req.body.id}`);
    // }console.log(posts.friends)
    if ( posts.friends.includes(friend_id)){
      res.json({
        message:"He's already you'r friend"
      })
    }
    //console.log(user_id)
    //console.log(friend_id)
    else{
    const friend=await user_details.findByIdAndUpdate(req.session.userId,{
      
      $push:{friends:friend_id}
      
    }
    )
    .then(result=>{
      res.json({
        message:'friend added successfully ',
        result:result
      })
    })
    .catch(err=>{
      res.json({
        error:err
      })
    })}
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
router.get('/profile',auth,(req,res)=>{
  user_details.findById(req.session.userId,(err,data)=>{
    if(!err){
        res.json({
          //data:data,
          name:data.name,
          email:data.email,
          gender:data.gender,
          phone:data.phone,
          friends:data.friends,
          user:req.user
        })
    }
    else{
        console.log(err)
    }
})
})
router.delete('/removefriend',async(req,res)=>{
  friend_id=req.body.friend_id.toString()
  let posts = await user_details.findById(req.session.userId);
  console.log(friend_id)
  // if (!posts) {
  //   res.json({
  //     message:`No post with id${req.body.id}`
  //   })
  //   //throw new NotFoundError(`No post with id${req.body.id}`);
  // }console.log(posts.friends)
  if ( posts.friends.includes(friend_id)){
    const friend=await user_details.findByIdAndUpdate(req.session.userId,{
    
      $pull:{friends:friend_id}
      
    }
    )
    .then(result=>{
      res.json({
        message:'friend removed successfully ',
        result:result
      })
    })
    .catch(err=>{
      res.json({
        error:err
      })
    })}

  //console.log(user_id)
  //console.log(friend_id)
  else{
    res.json({
      message:"He's not your friend"
    })}
})

module.exports = router; 