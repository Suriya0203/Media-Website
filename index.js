
var express=require('express');
var app=express()
const connectDB = require('./config/db');
const multer=require('multer')
var path=require('path')
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
app.use(express.static('public'))
var auth=require("./middleware/auth")

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
const store = new MongoDBStore({
    uri: "mongodb+srv://Suriya:%24uriyA%402003@cluster0.g1bqx.mongodb.net/media?retryWrites=true&w=majority",
    collection: "mySessions",
  });
app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );

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

app.listen('2000',()=>{
    console.log('server listening')
})
