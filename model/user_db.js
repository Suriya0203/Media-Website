//const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const user_deatils=mongoose.model('user_details',{
	name:{
		type:String
	},
	email:{
		type:String,
		required:true

	},
	password:{
		type:String,
		required:true
	},
	phone:{
		type:String,
		required:true
	},
	gender:{
		type:String,
		required:true
	},
	friends:[{
		friendid:{
			type:String,
			required:true
		},
		friendat: {
			type: Date,
			default: new Date(),
			required: true,
		 },
	}]

})
module.exports=user_deatils