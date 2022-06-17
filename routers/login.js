var router=require("express").Router()
//var user_details=require('../model/user_db')
var mongo=require('../config/db')
var don=null 
//router.post('/login',login_validate);
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { check, validationResult } = require("express-validator");
const User = require("../model/user_db");
var jwtSecret = "mysecrettoken";
var auth=require("../middleware/auth")

router.post(
	"/login",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		console.log(errors)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
	
		const { email, password } = req.body;
		console.log("suriya")
		try {
			// See if user exists
			let user = await User.findOne({ email });

			if (!user) {
				return res
					.status(401)
					.json({ msg: "Invalid Credentials"});
			}

			const isMatch = await bcrypt.compare(password, user.password);
			console.log(isMatch)
			if (!isMatch) {
				console.log(1234)
				return res
					.status(400)
					.json({ msg: "Invalid Credentials"});
			}

			//Return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: "5 days" }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);
router.post(
	"/register",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter password with 6 or more characters"
		).isLength({ min: 5 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// See if user exists
			let user = await User.findOne({ email });

			if (user) {
				res.status(400).json({ errors: [{ msg: "User already exists" }] });
			}
			user = new User({
				name,
				email,
				password,
			});

			//Encrypt Password
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			//Return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 3 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);
router.get('/logout',(req,res)=>{
    //jwt.destroy()
    const token = req.header("x-auth-token");
    jwt.destroy(token)
    res.status(200).json({
      message:"Logout successfully"
    })
  })
router.get("/auth", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
router.post("/changepassword",auth,async (req,res)=>{
	try{
		const user=await User.findById(req.user.id)
		const isMatch = await bcrypt.compare(req.body.CurrentPassword, user.password);
		if(isMatch){
				//Encrypt Passwordconsole
				console.log("suriya")

				const salt = await bcrypt.genSalt(10);

				Newpassword = await bcrypt.hash(req.body.NewPassword, salt);
			console.log(Newpassword)
			var data=await User.findByIdAndUpdate(req.user.id,{
				$set:{password:Newpassword}
			  })
			  console.log(data)
			  res.json({
				  data:data	
			  })
			
		}
		else{
			res.json({
				message:"password doesn't match"
			})
		}
	}catch(err){
		res.json({
			error:err
		})
	}
})
module.exports=router
module.exports.don=don;
//module.exports=user