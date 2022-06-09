const mongoose = require('mongoose');

const post=mongoose.model('post',{
    name:{
        type:String,
        required:true
    },
    image:{
        //type:String
        data:Buffer,
        contentType:String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user_details",
        required: true,
     },
    likes:{
        type:[String]
    },
    createdByName:{
        type:String
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User_details' }

})
//post.collection.createIndex( { likedby: 1 }, { unique: true } )
module.exports=post