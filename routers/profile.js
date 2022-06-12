
var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
var auth=require("../middleware/auth")
var Mongoose=require("mongoose")
var User=require('./login')
const { route } = require("./post")
// var friend=require('../model/friends')
const friend = require("../model/friends")
// const friend = require("../model/friends")
router.get('/addfriend/:friend_id/:name',auth,async(req,res)=>{
    try{

    friend_id=req.params.friend_id.toString()
    username=req.params.name.toString()
    console.log(friend_id,"friend id")
    let posts = await friend.findById(req.user.id);
    console.log(friend_id)
    // if (!posts) {
    //   res.json({
    //     message:`No post with id${req.body.id}`
    //   })
    //   //throw new NotFoundError(`No post with id${req.body.id}`);
    // }console.log(posts.friends)
    // let user = await friend.findOne({ fri });
    // if ( posts.includes(friend_id)){
    //   res.json({
    //     message:"He's already you'r friend"
    //   })
    // }
    // console.log(user_id)
    // console.log(friend_id)
    // else{
    const friend_data=await friend.create(
      
      {userId:req.user.id,
      friendId:friend_id,
      friendName:username}
      
    )
    await friend_data.save()
    if(friend_data){      res.json({
      message:'friend added successfully ',
      // result:result
    })}

    }
  catch(err){
    console.log(err)
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
router.delete('/removefriend/:id',auth,async(req,res)=>{
  try{
    console.log(req.params.id,"friend id")
  friend_id=req.params.id.toString()
  user_id=req.user.id.toString()
  // let posts = await user_details.findById(req.user.id);
  console.log(friend_id)
  // if (!posts) {
  //   res.json({
  //     message:`No post with id${req.body.id}`
  //   })
  //   //throw new NotFoundError(`No post with id${req.body.id}`);
  // }console.log(posts.friends)
  // if ( posts.friends.includes(friend_id)){
    const friend_data=await friend.deleteOne({
    userId:user_id,
    friendId:friend_id
      
    }
    )
    console.log(friend_data)
    if(friend_data){
      res.status(200).json({
      message:'friend removed successfully ',
      result:friend_data
    })}}
    catch(err){
      console.log(err)
      res.json({
        message:err
      })
    }
  })

  //console.log(user_id)
  //console.log(friend_id
router.post('/editprofile',auth,async(req,res)=>{
  console.log(req.body.name)
  console.log(req.user.id)
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


router.get('/alluser',auth,async(req,res)=>{
  console.log("suriya")
  try{
  const data=await friend.find({userId : {$ne : req.user.id}})
    if(data){
        res.status(200).json({
          //data:data,
          data:data
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



////


router.get('/viewfriends',auth,async(req,res)=>{
  console.log("suriya")
  console.log(req.user.id)
  try{
    const data=await friend.find({userId:req.user.id})
    console.log(data)
    if(data){
        res.status(200).json({
          //data:data,
          data:data
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


module.exports = router; 