
var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
var auth=require("../middleware/auth")
var Mongoose=require("mongoose")
var User=require('./login')
const { route } = require("./post")
router.put('/addfriend',auth,async(req,res)=>{
    try{
    friend_id=req.body.friend_id.toString()
    let posts = await user_details.findById(req.user.id);
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
    const friend=await user_details.findByIdAndUpdate(req.user.id,{
      
      $push:{friends:friend_id}
      
    }
    )
    if(friend){      res.json({
      message:'friend added successfully ',
      result:result
    })}

    }}
  catch(err){
      res.json({
        error:err
      })
  }
  })
  router.get("/search/:id",auth,async(req,res)=>{
    try{
      const data=await user_details.findById(req.params.id)
        if(data){
            res.status(200).json({
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
            //console.log(err)
            res.status(404)
        }}
        catch(err){
          res.status(500).json({
            messsage:"Server error"
          })
        }
  })
router.get('/profile',auth,async(req,res)=>{
  try{
  const data=await user_details.findById(req.user.id)
    if(data){
        res.status(200).json({
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
        //console.log(err)
        res.status(404)
    }}
    catch(err){
      res.status(500).json({
        messsage:"Server error"
      })
    }
})
router.delete('/removefriend',auth,async(req,res)=>{
  try{
  friend_id=req.body.friend_id.toString()
  let posts = await user_details.findById(req.user.id);
  console.log(friend_id)
  // if (!posts) {
  //   res.json({
  //     message:`No post with id${req.body.id}`
  //   })
  //   //throw new NotFoundError(`No post with id${req.body.id}`);
  // }console.log(posts.friends)
  if ( posts.friends.includes(friend_id)){
    const friend=await user_details.findByIdAndUpdate(req.user.id,{
    
      $pull:{friends:friend_id}
      
    }
    )
    if(friend){
      res.json({
      message:'friend removed successfully ',
      result:result
    })}}}
    catch(err){
      res.json({
        message:"error"
      })
    }
  })

  //console.log(user_id)
  //console.log(friend_id
router.post('/editprofile',async(req,res)=>{
  console.log(req.body.name)
  try{
  const data=await user_details.findByIdAndUpdate(req.user.id,
    {
      $set:{name:req.body.name,email:req.body.email,phone:req.body.phone}
    }

  )
  if(data){
    res.json({
      message:'success'
    })
  }
}
catch(err){
  console.log(err)
}})
module.exports = router; 