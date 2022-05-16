//var mongo=require('../config/db')
var user_details=require('../model/user_db')
var post=require('../model/post')
//const { post } = require('../routers/approutes')
const multer=require('multer')
const upload=multer({dest:'uploads/'})

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

module.exports={
    login_validate:async(req,res)=>{
        //const body=req.body
        const Email=req.body.email
        console.log(Email)
        await user_details.findOne({email:Email},(err,data)=>{
            if(!err){
                res.send(data)
            }
            else{
                console.log(err);
            }
        })
    },
    register_validate:(req,res)=>{
        // bcrypt.hash(req.body.password,10,function(err,hashedPassword) {
        //     if(err){
        //         res.send(err)
        //     }
            
        // })

        const details=new user_details({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,//hashedPassword,
            phone:req.body.phone,
            gender:req.body.gender

        })
        console.log(req.body.email)
        details.save()
        .then(details=>{
            res.send('user added succefully')
        }).catch(error=>{
            res.send('error occured')
        })
    },
    find_user:(req,res)=>{
        id=req.params.id
        user_details.findById(id,(err,data)=>{
            if(!err){
                res.send(data)
            }
            else{
                console.log(err)
            }
        })
    },
    createpost:(req,res)=>{
        //const { caption } = req.body;
        //let image = req.files?.image || '';
        upload.single('image')
        console.log(req.file)
        //console.log(req.files)
        const image=new post({
            name:req.body.name
        })
        image.save((err,data)=>{
            if(!err){
                res.send(data)
            }
            else{
                res.send(err)
            }
        })
    }
}


