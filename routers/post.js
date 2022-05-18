var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
const { StatusCodes } = require('http-status-codes');
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
  //console.log(req.user)  
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
                createdBy:req.session.userId//req.body.createrid
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
			$push: { comments: { comment: req.body.comment,commentedBy: req.session.userId}},//req.body.commentByid} },//commentedBy: req.user_details.id
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

      image.deleteOne( { _id: Mongoose.Types.ObjectId(req.params.id ),createdBy:req.session.userId} )
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

  )



router.put('/addlike',auth,async(req,res)=>{
    // console.log(req.body.id)
    let posts = await image.findById(req.body.id);
    console.log(posts)
    if (!posts) throw new NotFoundError(`No post with id${req.body.id}`);
    console.log(posts.likes)
    if ( posts.likes.includes(req.session.userId.toString())){
      res.json({
        message:"you'r already liked"
      })
    }
    else{
  
    posts = await image.findByIdAndUpdate(
      req.body.id,
      {
        $push: { likes: req.session.userId },
      },
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ posts });
  }
})

  router.delete('/deletecomment/:id',auth,(req,res)=>{
    const{userId}=req.session
    console.log(req.session.userId,'suriya')

    image.updateOne(
      { _id: Mongoose.Types.ObjectId(req.params.id) },
      {
        $pull: { comments: { commentedBy: req.session.userId } }
      }
    )
    .then(result=>{
      console.log(result)
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
              $push: { comments: { comment: req.body.comment,commentedBy: req.session.userId}},//req.body.commentByid} },//commentedBy: req.user_details.id
      })
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
  