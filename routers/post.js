var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
//const multer = require('multer')
//const { mutateExecOptions } = require('nodemon/lib/config/load')
//mongo();
var Mongoose=require("mongoose")
const multer=require('multer')
var auth=require("../middleware/auth")
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
router.post('/createpost',auth,(req,res)=>{
  console.log(req.user)  
  upload(req,res,(err)=>{
        if (err){
            console.log(err)
        }
        else{
            const newImage=new image({
                name:req.body.name,
                image:{
                    data:req.filename,
                    contentType:'image/png'
                },
                createdBy:req.body.createrid
                //user:getUser()
            })
            newImage.save().then(()=>{
                res.send('successfully added')
            }).catch(err=>console.log(err))
        }
    })
})
router.get('/getpost/:id',auth,(req,res)=>{
    id=req.params.id
    //console.log(req.auth.email)
    image.findById(id,(err,data)=>{
        if(!err){
            //res.send(data)
            res.json({
              data:data
            })
        }
        else{
            console.log(err)
        }
    })
})
router.post('/addcomment', auth,(req,res)=>{
    //console.log(req.profile)
    //console.log(req.user_details.id)
    const post =  image.findByIdAndUpdate(
		req.body.id,
		{
			$push: { comments: { comment: req.body.comment,commentedBy: req.body.commentByid} },//commentedBy: req.user_details.id
		},

	)
  .then(result=>{
    res.json({
      message:'comment added successfully',
      result:result
    })
  })
  .catch(err=>{
    res.json({
      error:err
    })
  })
})
router.delete('/deletepost/:id',auth,(req,res)=>{
  image.findOne(req.userId).then(result=>{
    if(result){
      res.json({
        message:"post is not exist"
      })
    }
    else{
      console.log(req.userId)
      image.deleteOne( { _id: Mongoose.Types.ObjectId(req.params.id ),createdBy:req.body.creatorid} )
      .then(result=>{
        res.json({
          message:'successfully deleted'
        })
      })
      .catch(err=>{
        res.json({
          error:err
        })
      })
    }
  }).catch(err=>{
    res.json({
      error:err
    })
  })

})



router.put('/addlike',auth,(req,res)=>{
    console.log(req.body.id)
    //console.log(req.user_details.id)
    const data=image.findById(req.body.id).then(result=>{
      console.log(result)
      if(result.likes.length>=1){
        res.json({
          message:"you'r already liked",
          result:result.likes
        })
      }
      else{
          
      const post =  image.findByIdAndUpdate(
      req.body.id,
      {
        $push: { likes: {like:'liked',likedby:req.body.likeByid}},//commentedBy: req.user_details.id
      },
    
    )
      .then(result=>{
        res.json({
          message:'like added successfully '
        })
      })
      .catch(err=>{
        res.json({
          error:err
        })
      }) 
      }
    }).catch(err=>{
      res.json({
        error:err
      })
    })
     
  })
  router.delete('/deletecomment/:id',auth,(req,res)=>{
    console.log(req.params.id)
    image.deleteOne( {comments:{ _id: Mongoose.Types.ObjectId(req.params.id), }} )
    .then(result=>{
      res.json({
        message:'successfully deleted',
        result:result
      })
    })
    .catch(err=>{
      res.json({
        error:err
      })
    })
    
  })
  router.put('/updatecomment',auth,(req,res)=>{
    const update=image.findOneAndUpdate(req.body.id,
      {
              $push: { comments: { comment: req.body.comment,commentedBy: req.body.commentByid} },//commentedBy: req.user_details.id
          },)
      .then(result=>{
        res.json({
          message:'comment updated successfully',
          result:result
        })
      })
      .catch(err=>{
        res.json({
          error:err
        })
      })
      //res.send('comment updated successfully')
  })
  
  module.exports = router;        
  