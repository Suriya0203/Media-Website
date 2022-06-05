const mongoose = require('mongoose');
const comment=mongoose.model('comment',{
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"post"
    },
    commentedBy: {
        type: mongoose.Types.ObjectId,
        ref: "user_details",
        //required: true,
     },
     commentedByName:{
         type:String
     },
     comment: {
        type: String,
        required: true,
     },
     commentedAt: {
        type: Date,
        default: new Date(),
        required: true,
     },
})
module.exports=comment