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
        //required: true,
     },
    comments: [
        {
            
           commentedBy: {
              type: mongoose.Types.ObjectId,
              ref: "user_details",
              //required: true,
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
        },
     ],
    likes:[{
        like:{
            type:String
            },
        likedby:{
            type: mongoose.Types.ObjectId,
            ref: "user_details",
        }
        
        
        
    }],

    user: { type: mongoose.Schema.ObjectId, ref: 'User_details' }

})
module.exports=post