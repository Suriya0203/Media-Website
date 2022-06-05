const mongoose = require('mongoose');
const friend=mongoose.model('friend',{
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user_details"
    },
    friendId: {
        type: mongoose.Types.ObjectId,
        ref: "user_details",
        //required: true,
     },
     friendName:{
         type:String
     },
     friendaddedAt: {
        type: Date,
        default: new Date(),
        required: true,
     },
})
module.exports=friend