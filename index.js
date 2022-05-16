
var express=require('express');
var app=express()

const multer=require('multer')
var path=require('path')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const upload=multer({dest:'uploads/'})
var user=require('./routers/approutes')
app.use('/',user);

app.get('/name',(req,res)=>{
    res.send('suriya')
})
const connectDB = require('./config/db');
// Load Config
//dotenv.config({path: './config/config.env'})

app.listen('2000',()=>{
    console.log('server listening')
})
