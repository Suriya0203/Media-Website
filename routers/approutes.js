const {
    login_validate,
    register_validate,
    find_user,
    createpost

}=require('../controller/appcontroller')
var router=require("express").Router()
var user_details=require('../model/user_db')
var mongo=require('../config/db')
var image=require('../model/post')
//const multer = require('multer')
const { mutateExecOptions } = require('nodemon/lib/config/load')
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
var saltRounds = 10; 
//router.post('/login',login_validate);
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { route } = require('express/lib/application')
//router.post('/register',register_validate)

router.get('/profile/:id',(req,res)=>{
    id=req.params.id
    user_details.findById(id,(err,data)=>{
        if(!err){
            res.send(data)
        }
        else{
            console.log(err)
        }
    })
})

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

router.put('/addfriend',async(req,res)=>{
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
router.get("/search/:id",(req,res)=>{
  const search=user_details.findById(req.params.id,(err,data)=>{
    if(!err){
      res.send(data)
    }
    else{
      console.log(err)
    }
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

 
//