var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
//const multer = require('multer')
//const { mutateExecOptions } = require('nodemon/lib/config/load')
//mongo();
const multer=require('multer')
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
router.post('/createpost',(req,res)=>{
    upload(req,res,(err)=>{
        if (err){
            console.log(err)
        }
        else{
            const newImage=new image({
                name:req.body.name,
                image:{
                    data:req.file.fileame,
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
router.get('/getpost/:id',(req,res)=>{
    id=req.params.id
    image.findById(id,(err,data)=>{
        if(!err){
            res.send(data)
        }
        else{
            console.log(err)
        }
    })
})
router.post('/addcomment', (req,res)=>{
    console.log(req.body.id)
    //console.log(req.user_details.id)
    const post =  image.findByIdAndUpdate(
		req.body.id,
		{
			$push: { comments: { comment: req.body.comment,commentedBy: req.body.commentByid} },//commentedBy: req.user_details.id
		},

	)
  .then(result=>{
    res.json({
      message:'comment added successfully'
    })
  })
  .catch(err=>{
    res.json({
      error:err
    })
  })
})
router.delete('/deletepost/:id',(req,res)=>{
  image.deleteOne( { _id: req.params.id } )
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
})



router.put('/addlike',(req,res)=>{
    console.log(req.body.id)
    //console.log(req.user_details.id)
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
  })
  router.delete('/deletecomment/:id',(req,res)=>{
    console.log(req.params.id)
    image.deleteOne( {comments:{ _id: req.params.id }} )
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
    
  })
  router.put('/updatecomment',(req,res)=>{
    const update=image.findOneAndUpdate(req.body.id,
      {
              $push: { comments: { comment: req.body.comment,commentedBy: req.body.commentByid} },//commentedBy: req.user_details.id
          },)
      .then(result=>{
        res.json({
          message:'comment updated successfully'
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
  