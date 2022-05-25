
var express=require('express');
var app=express()
const connectDB = require('./config/db');
const multer=require('multer')
var path=require('path')
app.use(express.static('public'))
var auth=require("./middleware/auth")
const cors=require("cors"
)
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
require('dotenv').config();
app.use(cors())


const upload=multer({dest:'uploads/'})
//var user=require('./routers/approutes')

var user_details=require('./routers/login')

var profile=require('./routers/profile')

var post=require('./routers/post')
//app.use('/',user);
app.use('/',user_details)
app.use('/',profile)
app.use('/',post)
app.get('/name',auth,(req,res)=>{
    
    
    res.send('suriya')
})
// Load Config
//dotenv.config({path: './config/config.env'})

app.listen(process.env.PORT,()=>{
    console.log('server listening')
})
