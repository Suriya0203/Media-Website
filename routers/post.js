var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
const comments_data=require('../model/comments')
const { StatusCodes } = require('http-status-codes');
//const multer = require('multer')
//const { mutateExecOptions } = require('nodemon/lib/config/load')
//mongo();
const fs = require("fs");
var Mongoose=require("mongoose")
const multer=require('multer')
var auth=require("../middleware/auth");
const post = require("../model/post")
//const comment = require("../model/comments");
let name='1234'
const Storage=multer.diskStorage({
    destination: "uploads",
    fileame:(req,res,cb)=>{
        cb(null,file.originalname);
    }
})

const upload=multer({
    storage:Storage
}).single('image')
router.post('/createpost',auth,async(req,res)=>{
  //console.log(req.user)  
  try{
    var user=await user_details.findById(req.user.id)
   upload(req,res,(err)=>{
        if (err){
            console.log(err)
        }
        else{
          
          console.log(user)
          console.log(user.name)
            const newImage= new image({
                name:req.body.name,
                image:{
                    data:fs.readFileSync("uploads/" + req.file.filename),
                    contentType:'image/jpg' || 'image/png' || 'image/jpeg'
                },
                createdBy:req.user.id,
                createdByName:user.name
            })
            newImage.save()
            if(newImage){
              res.status(200).json({
                message:"Post created successfully",
                data:newImage

              })
            }
            else{
              res.status(401)
            }
        }
    })}
    catch(err){
      console.log(err.message)
    }
})

router.post('/editprofile2',auth,async(req,res)=>{
  try{
    upload(req,res,(err)=>{
        if (err){
            console.log(err)
        }
        else{
          
          const data=user_details.findOneAndUpdate(req.user.id,
            {
              $set:{
                image:{
                  data:fs.readFileSync("uploads/" + req.file.filename),
                  contentType:'image/jpg' || 'image/png' || 'image/jpeg'
              },}
            }
        
          )
          console.log(data)
          if(data){
            res.json({
              message:'success',
              result:data
            })
          }
            else{
              res.status(401)
            }
        }
    })

}
catch(err){
  console.log(err)
}})


router.get('/getpost/:id',auth,async(req,res)=>{
    id=req.params.id
    //console.log(req.auth.email)
    try{
    const data=await image.findById(id)
        if(data){
            //res.send(data)
            res.status(200).json({
              data:data
            })
        }
        else{
           // console.log(err)
           res.status(404).json({
             message:"Post not found"
           })
        }
    }
    catch(err){
      res.status(500).json({
        message:"server error"
      })
    }
})
router.delete('/deletepost/:id',auth,async(req,res)=>{
  try{  
    const check=await image.findById(req.params.id)
    if (check){
      if(check.createdBy.toString()==req.user.id.toString()){
        await check.remove()
        return res.status(200).json({
          message:"post deleted successfully"
        })
      }
      else{
        res.status(401).json({
          message:"User Unauthorised"
        })

      }
    }

}
  catch(err){
    res.status(500).json({
      message:"Server Error"
    })
  }
}


  )



router.put('/addlike/:id',auth,async(req,res)=>{
    // console.log(req.body.id)
    try{
    let posts = await image.findById(req.params.id);
    console.log(posts)
    if (!posts){
      res.status(404).json({
        message:`No post with id${req.params.id}`
      })
    }
    // throw new NotFoundError(`No post with id${req.body.id}`);
    //console.log(posts.likes)
    else if ( posts.likes.includes(req.user.id.toString())){
      res.json({
        message:"you'r already liked"
      })
    }
    else{
  
    posts = await image.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.user.id },
      },
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ posts });
  }
}catch(err){
  res.status(500).json({
    message:"Server error"
  })
}
})
router.delete('/removelike/:id',auth,async(req,res)=>{
    try{
    let posts = await image.findById(req.params.id);
    console.log(posts)
    if (!posts){
      res.status(404).json({
        message:`No post with id${req.params.id}`
      })
    }
    // throw new NotFoundError(`No post with id${req.body.id}`);
    //console.log(posts.likes)
    else if ( posts.likes.includes(req.user.id.toString())){
      posts = await image.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: req.user.id },
        },
        { new: true, runValidators: true }
      );
      res.status(StatusCodes.OK).json({
        message:"Like removed successfully",
        post: posts });
    } 
    else{
      res.json({
        message:"you'r not liked this post"
      })}
    }
    catch(err){
      res.status(500).json({
        message:"Server error"
      })
    }
  })
router.post('/addcomment', auth,async(req,res)=>{
    try{
    var post=await image.findById(req.body.postId)
    var user=await user_details.findById(req.user.id)
    console.log(user.name)
    console.log(post)
    if (post=="null"){
      res.status(404).json({
        messsage:"NO post in this id"
      })
    }
    else{
    var newComment = new comments_data({
      comment: req.body.comment,
      commentedBy: req.user.id,
      postId:req.body.postId,
      commentedByName:user.name
    })
    newComment.save().then(result=>{
      res.status(200).json({
        message:"comment added successfully",
        result:result
      })
    }).catch(err=>{
      res.json({
        error:err
      })
    })}}
  catch(err){
    res.status(500).json({
      message:"Server error"
    })
  }
})
router.get('/viewpost',auth,async(req,res)=>{
  try{
  const data=await image.find({createdBy:req.user.id})
  if(data){
    res.status(200).json({
      data:data
    })
    console.log(data)
  }
  else{
    res.status(401).json({
      message:"No post in this ID"
    })
  }
}
  catch(err){
    res.status(500).json({
      message:"Server error"
    })
  }

})
router.delete('/deletecomment/:id',auth,async(req,res)=>{
  
  console.log(req.params.id,"suriya prakash")
  try{
  var post=await comments_data.findById({_id:req.params.id})
  console.log(post)
  if(post!="null"){
    //res.send(post.commentedBy)
    if(post.commentedBy.toString()==req.user.id.toString()){
        var del=await comments_data.findOneAndDelete({_id:req.params.id})
        if(del){
            res.status(200).json({
              message:"comment deleted succesfully",
              data:del
            })
            console.log(del)
        }
        else{
          res.status(401).json({
            message:"User Unauthorized"
          })
        }
    }
  else{
      res.status(401).json({
        message:"you'r not comment this post"
      })
    }
    
  }}
  catch(err){
    res.status(500).json({
      message:"Server error"
    })
  }
})
router.put('/editcomment',auth,async(req,res)=>{

  console.log(req.body.id)
  console.log(req.body.comment)
  try{
  var post=await comments_data.findById({_id:req.body.id})
  console.log(post)
  if(post!="null"){
    //res.send(post.commentedBy)
    if(post.commentedBy.toString()==req.user.id.toString()){
        var del=await comments_data.findByIdAndUpdate({_id:req.body.id},{
          $set:{comment:req.body.comment}
        })
        if(del){
          res.status(200).json({
            message:"comment edited successfully "
          })
        }
        else{
          res.status(401).json({
            message:"User unauthorized"
          })
        }
    }
    else{
      res.json({
        message:"you'r not comment this post"
      })
    }
  }
  else{
    res.json({
      message:"Your not comment this post"
    })
  }}
  catch(err){
    res.status(500).json({
      message:"Server error"
    })
  }
})
router.put('/editpost',auth,async(req,res)=>{
  console.log(req.body.id)
  try{
  var post=await image.findById({_id:req.body.id})
  console.log(post)
  if(post!="null"){
    //res.send(post.commentedBy)
    if(post.createdBy.toString()==req.user.id.toString()){
        var del=await image.findByIdAndUpdate({_id:req.body.id},{
          $set:{name:req.body.name}
        })
        if(del){
          res.status(200).json({
            message:"Post edited successfully"
          })
        }
        else{
          res.status(401).json({
            message:"User unauthorized"
          })
        }
    }
    else{
      res.json({
        message:"you'r not cretaed this post"
      })
    }
  }
  else{
    res.json({
      message:"Your not created this post"
    })
  }
}
catch(err){
  res.status(500).json({
    message:"Server error"
  })
}
})

router.get('/allpost',auth,async(req,res)=>{
  console.log("suriya")
  try{
  const data=await image.find({_id : {$ne : req.user.id}})
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

router.get('/comments/:id',auth,async(req,res)=>{
  id=req.params.id
  console.log(id)
  try{
  const data=await comments_data.find({postId:id})
  if(data){
    res.status(200).json({
      data:data
    })
    console.log(data)
  }
  else{
    res.status(401).json({
      message:"No post in this ID"
    })
  }
}
  catch(err){
    console.log(err)
    res.status(500).json({
      message:"Server error"
    })
  }

})
module.exports = router;        
  